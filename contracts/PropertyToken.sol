// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title PropertyToken
 * @dev ERC-20 token representing fractional ownership of real estate property
 * Each token represents one unit of ownership in the property
 */

contract PropertyToken is ERC20, Ownable, ReentrancyGuard {
    struct PropertyInfo {
        string title;
        string description;
        uint256 valuation;
        uint256 pricePerToken;
        string ipfsHash;
        bool isVerified;
        uint256 createdAt;
    }

    PropertyInfo public propertyInfo;
    address public propertyOwner;
    bool public tokensIssued;

    // events
    event PropertyCreated(address indexed owner, string title, uint256 valuation, uint256 totalSupply, uint256 pricePerToken);
    event TokensMinted(address indexed to, uint256 amount, uint256 timestamp);
    event PropertyVerified(address indexed verifier, bool isVerified, uint256 timestamp);

    /**
     * @dev Constructor to create a new property token
     * @param _name Token name (e.g., "Downtown Apartment Tokens")
     * @param _symbol Token symbol (e.g., "DAT")
     * @param _title Property title
     * @param _description Property description
     * @param _valuation Total property valuation in wei
     * @param _totalSupply Total number of tokens to be issued
     * @param _pricePerToken Price per token in wei
     * @param _ipfsHash IPFS hash containing property documents
     * @param _propertyOwner Address of the property owner
     */

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _title,
        string memory _description,
        uint256 _valuation,
        uint256 _totalSupply,
        uint256 _pricePerToken,
        string memory _ipfsHash,
        address _propertyOwner
    ) ERC20(_name, _symbol) Ownable(_propertyOwner) {
        require(_propertyOwner != address(0), "Invalid property owner address");
        require(_valuation > 0, "Property valuation must be greater than 0");
        require(_totalSupply > 0, "Total supply must be greater than 0");
        require(_pricePerToken > 0, "Price per token must be greater than 0");
        require(bytes(_title).length > 0, "Property title cannot be empty");

        // set property information
        propertyInfo = PropertyInfo({
            title: _title,
            description: _description,
            valuation: _valuation,
            pricePerToken: _pricePerToken,
            ipfsHash: _ipfsHash,
            isVerified: false,
            createdAt: block.timestamp
        });

        propertyOwner = _propertyOwner;
        tokensIssued = false;
        
        // Transfer ownership to property owner
        _transferOwnership(_propertyOwner);
        
        emit PropertyCreated(_propertyOwner,_title,_valuation,_totalSupply,_pricePerToken);
    }

    /**
     * @dev Creates property tokens - deploys ERC-20 contract with metadata
     * This function is called during contract deployment
     * @return success Boolean indicating successful creation
     */
    function createProperty() external view returns (bool success) {
        // Property is created during contract deployment
        // This function exists for interface compatibility
        require(bytes(propertyInfo.title).length > 0, "Property not initialized");
        return true;
    }

    /**
     * @dev Mints the full supply of tokens to the property owner's wallet
     * Can only be called once by the property owner
     */
    function mintTokens() external onlyOwner nonReentrant {
        require(!tokensIssued, "Tokens already minted");
        require(propertyInfo.isVerified, "Property must be verified before minting");
        
        uint256 totalTokens = propertyInfo.valuation / propertyInfo.pricePerToken;
        
        _mint(propertyOwner, totalTokens);
        tokensIssued = true;
        
        emit TokensMinted(propertyOwner, totalTokens, block.timestamp);
    }

    /**
     * @dev Verifies property ownership (simulated on-chain for demo)
     * In production, this would involve off-chain KYC/legal document verification
     * @param _verified Verification status
     */
    function verifyPropertyOwnership(bool _verified) external onlyOwner {
        propertyInfo.isVerified = _verified;
        emit PropertyVerified(msg.sender, _verified, block.timestamp);
    }

    /**
     * @dev Alternative verification function for external verifiers
     * @param _verified Verification status
     */
    function setVerificationStatus(bool _verified) external {
        // In a real implementation, this would check if msg.sender is an authorized verifier
        // For demo purposes, we'll allow the owner to verify
        require(msg.sender == propertyOwner, "Only property owner can verify");
        propertyInfo.isVerified = _verified;
        emit PropertyVerified(msg.sender, _verified, block.timestamp);
    }
    
    /**
     * @dev Gets property information
     * @return PropertyInfo struct containing all property details
     */
    function getPropertyInfo() external view returns (PropertyInfo memory) {
        return propertyInfo;
    }

    /**
     * @dev Gets the total supply of tokens for this property
     * @return uint256 Total number of tokens
     */
    function getTotalTokenSupply() external view returns (uint256) {
        return totalSupply();
    }

    /**
     * @dev Checks if tokens have been issued
     * @return bool Whether tokens have been minted
     */
    function areTokensIssued() external view returns (bool) {
        return tokensIssued;
    }
    
    /**
     * @dev Gets the property owner address
     * @return address Property owner's address
     */
    function getPropertyOwner() external view returns (address) {
        return propertyOwner;
    }

    /**
     * @dev Updates IPFS hash for property documents
     * @param _newIpfsHash New IPFS hash
     */
    function updatePropertyDocuments(string memory _newIpfsHash) external onlyOwner {
        require(bytes(_newIpfsHash).length > 0, "IPFS hash cannot be empty");
        propertyInfo.ipfsHash = _newIpfsHash;
    }
    
    /**
     * @dev Updates property price per token
     * @param _newPricePerToken New price per token in wei
     */
    function updatePricePerToken(uint256 _newPricePerToken) external onlyOwner {
        require(_newPricePerToken > 0, "Price must be greater than 0");
        require(!tokensIssued, "Cannot update price after tokens are minted");
        propertyInfo.pricePerToken = _newPricePerToken;
    }

    /**
     * @dev Override transfer function to add any additional logic if needed
     * Currently allows standard ERC-20 transfers
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(tokensIssued, "Tokens not yet issued");
        return super.transfer(to, amount);
    }
    
    /**
     * @dev Override transferFrom function to add any additional logic if needed
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        require(tokensIssued, "Tokens not yet issued");
        return super.transferFrom(from, to, amount);
    }
}