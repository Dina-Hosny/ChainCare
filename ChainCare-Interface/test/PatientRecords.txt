const { expect } = require("chai");

describe("Patient Records Contract", () => {
  let Contract;
  let owner;
  let admin1;
  let provider1;
  let entity1;
  let patient1;
  let patient2;

  let DEFAULT_ADMIN_ROLE;
  let ADMIN_ROLE;
  let PATIENT_ROLE;
  let PROVIDER_ROLE;
  let ENTITY_ROLE;

  beforeEach(async () => {
    PatientRecords = await ethers.getContractFactory("PatientRecords");
    [owner, admin1, provider1, entity1, patient1, patient2] =
      await ethers.getSigners();
    Contract = await PatientRecords.deploy();
    DEFAULT_ADMIN_ROLE = await Contract.DEFAULT_ADMIN_ROLE();
    ADMIN_ROLE = await Contract.ADMIN_ROLE();
    PATIENT_ROLE = await Contract.PATIENT_ROLE();
    PROVIDER_ROLE = await Contract.PROVIDER_ROLE();
    ENTITY_ROLE = await Contract.ENTITY_ROLE();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      console.log("     Owner Address: ", owner.address);
      expect(await Contract.owner()).to.equal(owner.address);
    });
  });

  describe("Owner/Deployer Address Assertion", () => {
    it("Owner role is DEFAULT_ACCOUNT_ROLE", async () => {
      expect(
        await Contract.hasRole(DEFAULT_ADMIN_ROLE, owner.address)
      ).to.equal(true);
    });
    it("The admin of the owner role is DEFAULT_ACCOUNT_ROLE", async () => {
      expect(await Contract.getRoleAdmin(DEFAULT_ADMIN_ROLE)).to.equal(
        DEFAULT_ADMIN_ROLE
      );
    });
    it("Owner role is not ADMIN_ROLE", async () => {
      expect(await Contract.hasRole(ADMIN_ROLE, owner.address)).to.equal(false);
    });
    it("Owner role is not PATIENT_ROLE", async () => {
      expect(await Contract.hasRole(PATIENT_ROLE, owner.address)).to.equal(
        false
      );
    });
    it("Owner role is not PROVIDER_ROLE", async () => {
      expect(await Contract.hasRole(PROVIDER_ROLE, owner.address)).to.equal(
        false
      );
    });
    it("Owner role is not ENTITY_ROLE", async () => {
      expect(await Contract.hasRole(ENTITY_ROLE, owner.address)).to.equal(
        false
      );
    });
  });

  describe("Admin Address Assertion", () => {
    it("Admin role is Admin", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.hasRole(ADMIN_ROLE, admin1.address)).to.equal(true);
    });
    it("The admin of the admin role is DEFAULT_ACCOUNT_ROLE", async () => {
      expect(await Contract.getRoleAdmin(ADMIN_ROLE)).to.equal(
        DEFAULT_ADMIN_ROLE
      );
    });
    it("Admin role is ADMIN_ROLE", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.hasRole(ADMIN_ROLE, admin1.address)).to.equal(true);
    });
    it("Admin role is not PATIENT_ROLE", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.hasRole(PATIENT_ROLE, admin1.address)).to.equal(
        false
      );
    });
    it("Admin role is not PROVIDER_ROLE", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.hasRole(PROVIDER_ROLE, admin1.address)).to.equal(
        false
      );
    });
    it("Admin role is not ENTITY_ROLE", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.hasRole(ENTITY_ROLE, admin1.address)).to.equal(
        false
      );
    });
    it("Admin role is not DEFAULT_ADMIN_ROLE", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(
        await Contract.hasRole(DEFAULT_ADMIN_ROLE, admin1.address)
      ).to.equal(false);
    });
  });

  describe("Provider Address Assertion", () => {
    it("Provider role is Provider", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.hasRole(PROVIDER_ROLE, provider1.address)).to.equal(
        true
      );
    });
    it("The admin of the provider role is DEFAULT_ACCOUNT_ROLE", async () => {
      expect(await Contract.getRoleAdmin(PROVIDER_ROLE)).to.equal(
        DEFAULT_ADMIN_ROLE
      );
    });
    it("Provider role is PROVIDER_ROLE", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.hasRole(PROVIDER_ROLE, provider1.address)).to.equal(
        true
      );
    });
    it("Provider role is not PATIENT_ROLE", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.hasRole(PATIENT_ROLE, provider1.address)).to.equal(
        false
      );
    });
    it("Provider role is not ADMIN_ROLE", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.hasRole(ADMIN_ROLE, provider1.address)).to.equal(
        false
      );
    });
    it("Provider role is not ENTITY_ROLE", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.hasRole(ENTITY_ROLE, provider1.address)).to.equal(
        false
      );
    });
    it("Provider role is not DEFAULT_ADMIN_ROLE", async () => {
      await Contract.registerProvider(provider1.address);
      expect(
        await Contract.hasRole(DEFAULT_ADMIN_ROLE, provider1.address)
      ).to.equal(false);
    });
  });

  describe("Modifier Testing", () => {
    it("notOwner modifier is working as expected", async () => {
      await expect(Contract.registerAdmin(owner.address)).to.be.revertedWith(
        "Owner account can not execute this operation"
      );
    });
    it("onlyNew modifier is working as expected", async () => {
      await Contract.registerAdmin(admin1.address);

      await expect(Contract.registerAdmin(admin1.address)).to.be.revertedWith(
        "This account already have this role"
      );
    });
    it("onlyVerifiedProvider modifier is working as expected", async () => {
      await Contract.registerAdmin(admin1.address);
      await Contract.registerPatient(
        patient1.address,
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b",
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f"
      );
      await expect(
        Contract.connect(admin1).assignPatientToDoctor(
          patient1.address,
          provider1.address
        )
      ).to.be.revertedWith("This account must be a registered provider");
    });
    it("onlyRegisteredPatient modifier is working as expected", async () => {
      await Contract.registerAdmin(admin1.address);
      await Contract.registerProvider(provider1.address);
      await expect(
        Contract.connect(admin1).assignPatientToDoctor(
          patient1.address,
          provider1.address
        )
      ).to.be.revertedWith("This account must be a registered patient");
    });
  });

  describe("Owner Register Admin", () => {
    it("Admin 1 is role not an admin yet", async () => {
      expect(await Contract.hasRole(ADMIN_ROLE, admin1.address)).to.equal(
        false
      );
    });
    it("Admin 1 is not a verified user yet", async () => {
      expect(await Contract.isAccountVerified(admin1.address)).to.equal(false);
    });
    it("Owner register a new admin (Admin 1)", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.hasRole(ADMIN_ROLE, admin1.address)).to.equal(true);
    });
    it("Admin 1 is now verified user", async () => {
      await Contract.registerAdmin(admin1.address);
      expect(await Contract.isAccountVerified(admin1.address)).to.equal(true);
    });
    it("Owner can not register Admin 1 again", async () => {
      await Contract.registerAdmin(admin1.address);
      await expect(Contract.registerAdmin(admin1.address)).to.be.revertedWith(
        "This account already have this role"
      );
    });
    it("The Owner can not register as an admin", async () => {
      await expect(Contract.registerAdmin(owner.address)).to.be.revertedWith(
        "Owner account can not execute this operation"
      );
    });
  });

  describe("Owner Register Provider", () => {
    it("Provider 1 role is not a provider yet", async () => {
      expect(await Contract.hasRole(PROVIDER_ROLE, provider1.address)).to.equal(
        false
      );
    });
    it("Provider 1 is not a verified user yet", async () => {
      expect(await Contract.isAccountVerified(provider1.address)).to.equal(
        false
      );
    });
    it("Owner register a new provider (Provider 1)", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.hasRole(PROVIDER_ROLE, provider1.address)).to.equal(
        true
      );
    });
    it("Provider 1 is now verified user", async () => {
      await Contract.registerProvider(provider1.address);
      expect(await Contract.isAccountVerified(provider1.address)).to.equal(
        true
      );
    });
    it("Owner can not register Provider 1 again", async () => {
      await Contract.registerProvider(provider1.address);
      await expect(
        Contract.registerProvider(provider1.address)
      ).to.be.revertedWith("This account already have this role");
    });
    it("The Owner can not register as a Provider", async () => {
      await expect(Contract.registerProvider(owner.address)).to.be.revertedWith(
        "Owner account can not execute this operation"
      );
    });
  });

  describe("Owner Register Entity", () => {
    it("Entity 1 role is not an entity yet", async () => {
      expect(await Contract.hasRole(ENTITY_ROLE, entity1.address)).to.equal(
        false
      );
    });
    it("Entity 1 is not a verified user yet", async () => {
      expect(await Contract.isAccountVerified(entity1.address)).to.equal(false);
    });
    it("Owner register a new entity (Entity 1)", async () => {
      await Contract.registerEntity(entity1.address);
      expect(await Contract.hasRole(ENTITY_ROLE, entity1.address)).to.equal(
        true
      );
    });
    it("Entity 1 is now verified user", async () => {
      await Contract.registerEntity(entity1.address);
      expect(await Contract.isAccountVerified(entity1.address)).to.equal(true);
    });
    it("Owner can not register Entity 1 again", async () => {
      await Contract.registerEntity(entity1.address);
      await expect(Contract.registerEntity(entity1.address)).to.be.revertedWith(
        "This account already have this role"
      );
    });
    it("The Owner can not register as a Entity", async () => {
      await expect(Contract.registerEntity(owner.address)).to.be.revertedWith(
        "Owner account can not execute this operation"
      );
    });
  });

  describe("Admin assign patients to providers", () => {
    it("Only admin can assign patient to doctor", async () => {
      await expect(
        Contract.assignPatientToDoctor(patient1.address, provider1.address)
      ).to.be.revertedWith(
        `AccessControl: account ${owner.address
          .toString()
          .toLowerCase()} is missing role ${ADMIN_ROLE.toString().toLowerCase()}`
      );
    });

    it("Only registered and verified provider can be assigned patients", async () => {
      await Contract.registerAdmin(admin1.address);
      await expect(
        Contract.connect(admin1).assignPatientToDoctor(
          patient1.address,
          provider1.address
        )
      ).to.be.revertedWith("This account must be a registered provider");
    });

    it("Only registered patient can be assigned to provider", async () => {
      await Contract.registerAdmin(admin1.address);
      await Contract.registerProvider(provider1.address);
      await expect(
        Contract.connect(admin1).assignPatientToDoctor(
          patient1.address,
          provider1.address
        )
      ).to.be.revertedWith("This account must be a registered patient");
    });

    it("Admin successfully assigned a registered patient to a verified provider", async () => {
      await Contract.registerAdmin(admin1.address);
      await Contract.registerProvider(provider1.address);
      await Contract.registerPatient(
        patient1.address,
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b",
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f"
      );
      await expect(
        Contract.connect(admin1).assignPatientToDoctor(
          patient1.address,
          provider1.address
        )
      ).not.revertedWith("");
    });
  });

  describe("Admin unassign assigned patients", () => {
    it("Successfully unassigned assigned patients", async () => {
      await Contract.registerAdmin(admin1.address);
      await Contract.registerProvider(provider1.address);
      await Contract.registerPatient(
        patient1.address,
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b",
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f"
      );
      await Contract.registerPatient(
        patient2.address,
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b",
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f"
      );

      // Assign patients
      await Contract.connect(admin1).assignPatientToDoctor(
        patient1.address,
        provider1.address
      );
      await Contract.connect(admin1).assignPatientToDoctor(
        patient2.address,
        provider1.address
      );
      console.log(await Contract.connect(provider1).getAssignedPatients());

      // Unassign them
      await Contract.connect(admin1).unAssignPatientFromDoctor(
        patient1.address,
        provider1.address
      );
      await Contract.connect(admin1).unAssignPatientFromDoctor(
        patient2.address,
        provider1.address
      );
      let zeroAddress = "0x0000000000000000000000000000000000000000";
      console.log(await Contract.connect(provider1).getAssignedPatients());
      expect(await Contract.connect(provider1).getAssignedPatients()).to.eql([
        zeroAddress,
        zeroAddress,
      ]);
    });
  });

  describe("Provider retrieving assigned patients", () => {
    it("Only verified provider can query assigned patients", async () => {
      await expect(Contract.getAssignedPatients()).to.be.revertedWith(
        `AccessControl: account ${owner.address
          .toString()
          .toLowerCase()} is missing role ${PROVIDER_ROLE.toString().toLowerCase()}`
      );
    });

    it("Provider successfully query assigned patients", async () => {
      await Contract.registerAdmin(admin1.address);
      await Contract.registerProvider(provider1.address);
      await Contract.registerPatient(
        patient1.address,
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b",
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f"
      );
      await Contract.registerPatient(
        patient2.address,
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b",
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f"
      );
      await Contract.connect(admin1).assignPatientToDoctor(
        patient1.address,
        provider1.address
      );
      await Contract.connect(admin1).assignPatientToDoctor(
        patient2.address,
        provider1.address
      );

      // console.log([patient1.address, patient2.address]);
      // console.log(await Contract.connect(provider1).getAssignedPatients());

      expect(await Contract.connect(provider1).getAssignedPatients()).to.eql([
        patient1.address,
        patient2.address,
      ]);
    });
  });

  describe("Patient viewing own records", () => {
    it("Only a registered patient can view own records", async () => {
      await expect(Contract.viewOwnRecords()).to.be.revertedWith(
        `AccessControl: account ${owner.address
          .toString()
          .toLowerCase()} is missing role ${PATIENT_ROLE.toString().toLowerCase()}`
      );
    });

    it("Patient view own records successfully", async () => {
      await Contract.registerPatient(
        patient1.address,
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b",
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f"
      );
      expect(await Contract.connect(patient1).viewOwnRecords()).to.eql([
        [],
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b",
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f",
      ]);
    });
  });

  describe("Patient granting provider access permission", () => {
    it("Provider 1 is not yet granted access by patient 1", async () => {
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b",
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f"
      );
      expect(
        await Contract.connect(patient1).isGrantedProvider(provider1.address)
      ).to.equal(false);
    });

    it("Patient 1 is not a provider thus can not check", async () => {
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b",
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f"
      );
      await expect(
        Contract.connect(patient1).isGrantedProvider(patient1.address)
      ).to.be.revertedWith("Patient account is not allowed here");
    });

    it("Patient 1 grant access to provider 1", async () => {
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b",
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f"
      );
      await Contract.registerProvider(provider1.address);
      Contract.connect(patient1).grantProviderAccess(provider1.address);
      expect(
        await Contract.connect(patient1).isGrantedProvider(provider1.address)
      ).to.equal(true);
    });

    it("Patient 1 revoke access from provider 1", async () => {
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b",
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f"
      );
      await Contract.registerProvider(provider1.address);
      await Contract.connect(patient1).grantProviderAccess(provider1.address);
      await Contract.connect(patient1).revokeGrantedProvider(provider1.address);
      expect(
        await Contract.connect(patient1).isGrantedProvider(provider1.address)
      ).to.equal(false);
    });
  });

  describe("Provider creating new record for patients", () => {
    it("Provider 1 crete new records for patient 1", async () => {
      let firstNameCID =
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b";
      let lastNameCID =
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f";

      // register a patient (patient 1)
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        firstNameCID,
        lastNameCID
      );

      // owner register a provider (provider 1)
      await Contract.registerProvider(provider1.address);

      // owner register an admin (admin 1)
      await Contract.registerAdmin(admin1.address);

      // admin 1 assign patient 1 to provider 1
      await Contract.connect(admin1).assignPatientToDoctor(
        patient1.address,
        provider1.address
      );

      // patient 1 grant provider 1 access
      await Contract.connect(patient1).grantProviderAccess(provider1.address);

      // verify patient 1 records before adding
      console.log(await Contract.connect(patient1).viewOwnRecords());
      console.log("\n\n");

      // provider 1 creates a new record for patient 1
      let recordCID =
        "be9356c54eea66f78c424f744dd34ef3cdd28bcc452c2fc67f3e5698eab8606d";
      await Contract.connect(provider1).createNewRecord(
        patient1.address,
        recordCID
      );

      // verify patient 1 has new record added by provider 1
      let patient1Records = await Contract.connect(patient1).viewOwnRecords();
      console.log(patient1Records);

      // verify hash and doctor address
      let doctorID = provider1.address;
      let expectedResults = [
        [[recordCID, doctorID]],
        firstNameCID,
        lastNameCID,
      ];

      expect(patient1Records).to.eqls(expectedResults);
    });

    it("Not granted providers can not create records for their assigned patients", async () => {
      let firstNameCID =
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b";
      let lastNameCID =
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f";
      let recordCID =
        "be9356c54eea66f78c424f744dd34ef3cdd28bcc452c2fc67f3e5698eab8606d";

      // register a patient (patient 1)
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        firstNameCID,
        lastNameCID
      );

      // owner register a provider (provider 1)
      await Contract.registerProvider(provider1.address);

      // owner register an admin (admin 1)
      await Contract.registerAdmin(admin1.address);

      // admin 1 assign patient 1 to provider 1
      await Contract.connect(admin1).assignPatientToDoctor(
        patient1.address,
        provider1.address
      );

      // patient 1 grant provider 1 access
      // await Contract.connect(patient1).grantProviderAccess(provider1.address);

      await expect(
        Contract.connect(provider1).createNewRecord(patient1.address, recordCID)
      ).to.be.revertedWith(
        "You are not granted permission to create a new record"
      );
    });

    it("Provider 1 cannot create record for unassigned patient", async () => {
      let firstNameCID =
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b";
      let lastNameCID =
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f";
      let recordCID =
        "be9356c54eea66f78c424f744dd34ef3cdd28bcc452c2fc67f3e5698eab8606d";

      // register a patient (patient 1)
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        firstNameCID,
        lastNameCID
      );

      // owner register a provider (provider 1)
      await Contract.registerProvider(provider1.address);

      // owner register an admin (admin 1)
      await Contract.registerAdmin(admin1.address);

      // admin 1 assign patient 1 to provider 1
      // await Contract.connect(admin1).assignPatientToDoctor(
      //   patient1.address,
      //   provider1.address
      // );

      // patient 1 grant provider 1 access
      await Contract.connect(patient1).grantProviderAccess(provider1.address);

      await expect(
        Contract.connect(provider1).createNewRecord(patient1.address, recordCID)
      ).to.be.revertedWith("This account is not an assigned patient");
    });
  });

  describe("Provider deleting patient records", () => {
    it("Successfully deleted patient 1 record after provider 1 created it", async () => {
      let firstNameCID =
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b";
      let lastNameCID =
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f";
      let recordCID =
        "be9356c54eea66f78c424f744dd34ef3cdd28bcc452c2fc67f3e5698eab8606d";

      // register a patient (patient 1)
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        firstNameCID,
        lastNameCID
      );

      // owner register a provider (provider 1)
      await Contract.registerProvider(provider1.address);

      // owner register an admin (admin 1)
      await Contract.registerAdmin(admin1.address);

      // admin 1 assign patient 1 to provider 1
      await Contract.connect(admin1).assignPatientToDoctor(
        patient1.address,
        provider1.address
      );

      // patient 1 grant provider 1 access
      await Contract.connect(patient1).grantProviderAccess(provider1.address);

      // verify patient 1 records before adding
      console.log(await Contract.connect(patient1).viewOwnRecords());
      console.log("\n\n");

      // provider 1 create new record for patient 1
      await Contract.connect(provider1).createNewRecord(
        patient1.address,
        recordCID
      );

      // verify patient 1 records after creation
      console.log(await Contract.connect(patient1).viewOwnRecords());
      console.log("\n\n");

      // provider 1 deletes the created record
      await Contract.connect(provider1).deleteRecord(
        patient1.address,
        recordCID
      );

      // verify patient 1 records after deletion
      console.log(await Contract.connect(patient1).viewOwnRecords());
      console.log("\n\n");

      // assetion here
      let expectedResults = [
        [["", "0x0000000000000000000000000000000000000000"]],
        firstNameCID,
        lastNameCID,
      ];

      expect(await Contract.connect(patient1).viewOwnRecords()).to.eqls(
        expectedResults
      );
    });

    it("Provider 1 try to delete patient 1 record that does not exist", async () => {
      let firstNameCID =
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b";
      let lastNameCID =
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f";
      let recordCID =
        "be9356c54eea66f78c424f744dd34ef3cdd28bcc452c2fc67f3e5698eab8606d";

      // register a patient (patient 1)
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        firstNameCID,
        lastNameCID
      );

      // owner register a provider (provider 1)
      await Contract.registerProvider(provider1.address);

      // owner register an admin (admin 1)
      await Contract.registerAdmin(admin1.address);

      // admin 1 assign patient 1 to provider 1
      await Contract.connect(admin1).assignPatientToDoctor(
        patient1.address,
        provider1.address
      );

      // patient 1 grant provider 1 access
      await Contract.connect(patient1).grantProviderAccess(provider1.address);

      // verify patient 1 records before adding
      console.log(await Contract.connect(patient1).viewOwnRecords());
      console.log("\n\n");

      // provider 1 create new record for patient 1
      // await Contract.connect(provider1).createNewRecord(
      //   patient1.address,
      //   recordCID
      // );

      // verify patient 1 records after creation
      // console.log(await Contract.connect(patient1).viewOwnRecords());
      // console.log("\n\n");

      // // provider 1 deletes the created record
      // await Contract.connect(provider1).deleteRecord(
      //   patient1.address,
      //   recordCID
      // );

      // // verify patient 1 records after deletion
      // console.log(await Contract.connect(patient1).viewOwnRecords());
      // console.log("\n\n");

      // assetion here
      // let expectedResults = [
      //   [["", "0x0000000000000000000000000000000000000000"]],
      //   firstNameCID,
      //   lastNameCID,
      // ];

      // 0x32 Array out-of-bounds or negative index
      await expect(
        Contract.connect(provider1).deleteRecord(patient1.address, recordCID)
      ).to.be.revertedWith("This patient has no records to delete");
    });
  });

  describe("Provider update patient records", () => {
    it("Provider 1 update record 1 of patient 1", async () => {
      // 1. data here
      let firstNameCID =
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b";
      let lastNameCID =
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f";
      let oldRecordCID =
        "be9356c54eea66f78c424f744dd34ef3cdd28bcc452c2fc67f3e5698eab8606d";
      let newRecordCID =
        "db7c45cc95a531e14d1e9f3f510afffc331aefec63f4aa487bc8a60ea254b936";

      // register patient 1
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        firstNameCID,
        lastNameCID
      );
      // owner register provider 1
      await Contract.registerProvider(provider1.address);
      // owner register admin 1
      await Contract.registerAdmin(admin1.address);
      // admin 1 assign patient 1 to provider 1
      await Contract.connect(admin1).assignPatientToDoctor(
        patient1.address,
        provider1.address
      );
      // patient 1 grant provider 1 access
      await Contract.connect(patient1).grantProviderAccess(provider1.address);

      console.log(await Contract.connect(patient1).viewOwnRecords());
      console.log("\n\n\n");
      // provider 1 create record 1 for paitent 1
      await Contract.connect(provider1).createNewRecord(
        patient1.address,
        oldRecordCID
      );

      console.log(await Contract.connect(patient1).viewOwnRecords());
      console.log("\n\n\n");

      // provider 1 update record 1 for patient 1
      await Contract.connect(provider1).updateRecord(
        patient1.address,
        oldRecordCID,
        newRecordCID
      );

      console.log(await Contract.connect(patient1).viewOwnRecords());
    });

    it("try to update empty records", async () => {
      // 1. data here
      let firstNameCID =
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b";
      let lastNameCID =
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f";
      let oldRecordCID =
        "be9356c54eea66f78c424f744dd34ef3cdd28bcc452c2fc67f3e5698eab8606d";
      let newRecordCID =
        "db7c45cc95a531e14d1e9f3f510afffc331aefec63f4aa487bc8a60ea254b936";

      // register patient 1
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        firstNameCID,
        lastNameCID
      );
      // owner register provider 1
      await Contract.registerProvider(provider1.address);
      // owner register admin 1
      await Contract.registerAdmin(admin1.address);
      // admin 1 assign patient 1 to provider 1
      await Contract.connect(admin1).assignPatientToDoctor(
        patient1.address,
        provider1.address
      );
      // patient 1 grant provider 1 access
      await Contract.connect(patient1).grantProviderAccess(provider1.address);

      console.log(await Contract.connect(patient1).viewOwnRecords());
      console.log("\n\n\n");
      // provider 1 create record 1 for paitent 1
      //  await Contract.connect(provider1).createNewRecord(
      //    patient1.address,
      //    oldRecordCID
      //  );

      //  console.log(await Contract.connect(patient1).viewOwnRecords());
      //  console.log("\n\n\n");

      // provider 1 update record 1 for patient 1

      // reverted with panic code 0x32
      // out-of-bounds or negative index

      await expect(
        Contract.connect(provider1).updateRecord(
          patient1.address,
          oldRecordCID,
          newRecordCID
        )
      ).to.be.revertedWith("0x32");

      //  console.log(await Contract.connect(patient1).viewOwnRecords());
    });
  });

  describe("Patient grant entities access", () => {
    it("Patient 1 grant entity 1 access for record sharing", async () => {
      // patient 1 register as a patient
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        "",
        ""
      );
      // owner registers entity 1
      await Contract.registerEntity(entity1.address);

      // patient 1 grant entity 1 access
      await Contract.connect(patient1).grantEntityAccess(entity1.address);

      // patient 1 verify access
      expect(
        await Contract.connect(patient1).isGrantedEntity(entity1.address)
      ).to.equal(true);
    });
  });

  describe("Patient share record with entities", () => {
    it("Patient 1 share record 1 with entity 1 after provider 1 creates record 1", async () => {
      // 1. data here
      let firstNameCID =
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b";
      let lastNameCID =
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f";
      let recordCID =
        "be9356c54eea66f78c424f744dd34ef3cdd28bcc452c2fc67f3e5698eab8606d";

      // patient 1 register as a patient
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        firstNameCID,
        lastNameCID
      );
      // owner registers entity 1
      await Contract.registerEntity(entity1.address);

      // patient 1 grant entity 1 access
      await Contract.connect(patient1).grantEntityAccess(entity1.address);

      // owner register admin 1
      await Contract.registerAdmin(admin1.address);

      // owner register provider 1
      await Contract.registerProvider(provider1.address);

      // admin 1 assign patient 1 to provider 1
      await Contract.connect(admin1).assignPatientToDoctor(
        patient1.address,
        provider1.address
      );

      // patient 1 grant provider 1 access
      await Contract.connect(patient1).grantProviderAccess(provider1.address);

      console.log(await Contract.connect(patient1).viewOwnRecords());
      console.log("\n\n");

      // provider 1 create record 1 for paitent 1
      await Contract.connect(provider1).createNewRecord(
        patient1.address,
        recordCID
      );

      console.log(await Contract.connect(patient1).viewOwnRecords());
      console.log("\n\n");

      // patient 1 share  record 1 to entity 1
      await Contract.connect(patient1).shareRecordWithEntity(
        entity1.address,
        recordCID
      );

      // entity 1 retreive record shared by patient 1
      console.log(
        await Contract.connect(entity1).viewSharedRecords(patient1.address)
      );
    });
  });

  describe("Patient revoke access for shared records with entities", () => {
    it("Patient 1 revoke share access from entity 1", async () => {
      // 1. data here
      let firstNameCID =
        "5a063d4c079f4c67a00b47c735b2296cd9de9f84532a0b0c921ad1ece4ccbd5b";
      let lastNameCID =
        "d9a07d0dfbd7f6446304c108edddeeef978f030d1bdcab045b7effb24ec5843f";
      let recordCID =
        "be9356c54eea66f78c424f744dd34ef3cdd28bcc452c2fc67f3e5698eab8606d";

      // patient 1 register as a patient
      await Contract.connect(patient1).registerPatient(
        patient1.address,
        firstNameCID,
        lastNameCID
      );
      // owner registers entity 1
      await Contract.registerEntity(entity1.address);

      // patient 1 grant entity 1 access
      await Contract.connect(patient1).grantEntityAccess(entity1.address);

      // owner register admin 1
      await Contract.registerAdmin(admin1.address);

      // owner register provider 1
      await Contract.registerProvider(provider1.address);

      // admin 1 assign patient 1 to provider 1
      await Contract.connect(admin1).assignPatientToDoctor(
        patient1.address,
        provider1.address
      );

      // patient 1 grant provider 1 access
      await Contract.connect(patient1).grantProviderAccess(provider1.address);

      console.log(await Contract.connect(patient1).viewOwnRecords());
      console.log("\n\n");

      // provider 1 create record 1 for paitent 1
      await Contract.connect(provider1).createNewRecord(
        patient1.address,
        recordCID
      );

      console.log(await Contract.connect(patient1).viewOwnRecords());
      console.log("\n\n");

      // patient 1 share  record 1 to entity 1
      await Contract.connect(patient1).shareRecordWithEntity(
        entity1.address,
        recordCID
      );

      // entity 1 retreive record shared by patient 1
      console.log(
        await Contract.connect(entity1).viewSharedRecords(patient1.address)
      );

      await Contract.connect(patient1).revokeAccessFromEntity(entity1.address);

      // patient 1 revoke access to entity 1
      console.log(
        await Contract.connect(entity1).viewSharedRecords(patient1.address)
      );
    });
  });

  describe("Entities view shared records", () => {});
});
