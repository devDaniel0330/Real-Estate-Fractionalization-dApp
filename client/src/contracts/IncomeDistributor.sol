

contract IncomeDistributor{
    PropertyToken private property;
    uint256 private totalIncomePool;
    mapping(address=>uint256) incomeRecords;
    mapping(address=>uint256) private claimed;
    address[] private investors;
    uint256 private lastDistributionTime;
    uint256 private distributionInterval;
    function depositIncome(amount: uint256) public returns (bool){

    }
    function calculateShare(investor: address) public returns (uint256){

    }
    function claimIncome(investor: address payable) private returns (uint256){
        
    }
    function getIncomeHistory(investor: address) public returns (uint256[]){

    }
    function registerInvestor() public{

    }
    function {

    }
}