const { expect } = require("chai");


describe("Electronic Health Records Contract", () => {

    let Contract;
    let owner;
    let patient1;

    // Roles
    let PATIENT_ROLE;
    let DEFAULT_ADMIN_ROLE;

    beforeEach(async () => {
      ElectronicHealthRecords = await ethers.getContractFactory("ElectronicHealthRecords");
      [owner, patient1] = await ethers.getSigners();

      Contract = await ElectronicHealthRecords.deploy();
      PATIENT_ROLE = await Contract.PATIENT_ROLE();
      DEFAULT_ADMIN_ROLE = await Contract.DEFAULT_ADMIN_ROLE();
    })

    describe("Deployment", () => {
      it("Should set the right owner", async () => {
        console.log("     Owner Address: ", owner.address);
        expect(await Contract.owner()).to.equal(owner.address);
      })
    })

    describe("Owner Role", () => {
      it("owner should have default admin role", async () => {
        expect(await Contract.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.equal(true);
      })
    })

    describe("Patient Role", () => {
     
      it("patient1 should have patient role", async () => {
        await Contract.connect(patient1).registerPatient("0x1");
        expect(await Contract.hasRole(PATIENT_ROLE, patient1.address)).to.equal(true);
      })

      it("patient1 has correct access grant", async () => {
        await Contract.connect(patient1).registerPatient("0x1");
        let accessGrant = await Contract.connect(patient1).getPatientAccessGrant();
        expect(accessGrant).to.equal("0x1");
      })

    })

  
});
