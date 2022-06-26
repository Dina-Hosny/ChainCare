//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "hardhat/console.sol";

contract ElectronicHealthRecords is Ownable, AccessControl {
   
    
    bytes32 public constant PATIENT_ROLE = keccak256("PATIENT_ROLE");
    
    struct Patient {
        string accessGrant;
    }

    mapping(address => Patient) private patients;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function registerPatient(string memory accessGrant) external {
        _setupRole(PATIENT_ROLE, msg.sender);
        Patient memory newPatient = Patient(accessGrant);
        patients[msg.sender] = newPatient;
    }

    function getPatientAccessGrant() external 
        onlyRole(PATIENT_ROLE) view returns (string memory) {
            return patients[msg.sender].accessGrant;
    }
}