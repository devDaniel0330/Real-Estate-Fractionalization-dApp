// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./PropertyToken.sol";

/**
 * @title PropertyTokenFactory
 * @dev Factory contract to create and manage PropertyToken contracts
 */
contract PropertyTokenFactory {
    
    address[] public deployedProperties;
    mapping(address => address[]) public ownerProperties;
    mapping(address => bool) public isValidProperty;
    
    event PropertyTokenDeployed(
        address indexed tokenContract,
        address indexed owner,
        string title,
        uint256 valuation,
        uint256 totalSupply
    );
    
    /**
     * @dev Creates a new PropertyToken contract
     */
    function createPropertyToken(
        string memory _name,
        string memory _symbol,
        string memory _title,
        string memory _description,
        uint256 _valuation,
        uint256 _totalSupply,
        uint256 _pricePerToken,
        string memory _ipfsHash
    ) external returns (address) {
        
        PropertyToken newProperty = new PropertyToken(
            _name,
            _symbol,
            _title,
            _description,
            _valuation,
            _totalSupply,
            _pricePerToken,
            _ipfsHash,
            msg.sender
        );
        
        address propertyAddress = address(newProperty);
        
        deployedProperties.push(propertyAddress);
        ownerProperties[msg.sender].push(propertyAddress);
        isValidProperty[propertyAddress] = true;
        
        emit PropertyTokenDeployed(
            propertyAddress,
            msg.sender,
            _title,
            _valuation,
            _totalSupply
        );
        
        return propertyAddress;
    }
    
    /**
     * @dev Auto-deploy and setup property with tokens
     */
    function createAndSetupProperty(
        string memory _title,
        string memory _description,
        uint256 _pricePerToken,
        uint256 _totalSupply,
        string memory _ipfsHash
    ) external returns (address) {
        
        uint256 valuation = _pricePerToken * _totalSupply;
        
        // Create the property token
        address propertyAddress = this.createPropertyToken(
            _title,                           // name
            _getSymbol(_title),              // symbol (first 3 chars)
            _title,                          // title
            _description,                    // description
            valuation,                       // valuation
            _totalSupply,                    // total supply
            _pricePerToken,                  // price per token
            _ipfsHash                        // IPFS hash
        );
        
        // Get the property contract instance
        PropertyToken property = PropertyToken(propertyAddress);
        
        // Verify and mint tokens automatically
        property.verifyPropertyOwnership(true);
        property.mintTokens();
        
        return propertyAddress;
    }
    
    function _getSymbol(string memory _title) internal pure returns (string memory) {
        bytes memory titleBytes = bytes(_title);
        if (titleBytes.length >= 3) {
            bytes memory symbol = new bytes(3);
            for (uint i = 0; i < 3; i++) {
                symbol[i] = titleBytes[i];
            }
            return string(symbol);
        }
        return "PROP";
    }
    
    function getDeployedProperties() external view returns (address[] memory) {
        return deployedProperties;
    }
    
    function getOwnerProperties(address _owner) external view returns (address[] memory) {
        return ownerProperties[_owner];
    }
    
    function getTotalProperties() external view returns (uint256) {
        return deployedProperties.length;
    }
    
    function validateProperty(address _propertyAddress) external view returns (bool) {
        return isValidProperty[_propertyAddress];
    }
}