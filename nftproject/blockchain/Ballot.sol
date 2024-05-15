struct Voter {
        uint weight;
        bool voted; 
    }

    struct Imitation {
        string  name;
        string  description;
        address holderContract;
        address payable recipient;
        uint256 sentAmount;
        uint256 agree;
        uint256 disagree;
        uint64 executionTimestamp;
        uint64 expireTime;
        bool status;
    }

    event ExecutedImitation(
        string  indexed name,
        string  description,
        address holderContract,
        address payable recipient,
        uint256 sentAmount,
        uint64 executionTimestamp,
        uint64 expireTime
    );

    mapping(uint64 => mapping(address => Voter)) public _voteMaps;

    Imitation[] public ImitationDetail; 
    

    function _createVote(
        string[] memory _nda, 
        address _holderContract, 
        address payable _recipient, 
        uint256 _sentAmount,
        uint64 _expireTime
        ) external onlyOwner {

        if(_expireTime < 10)// revert("reset the time.");
        require(_sentAmount < address(this).balance, "many");

        ImitationDetail.push(Imitation({
            name: _nda[0],
            description: _nda[1],
            holderContract: _holderContract,
            recipient: _recipient,
            sentAmount: _sentAmount,
            agree: 0,
            disagree: 0,
            executionTimestamp: uint64(block.timestamp),
            expireTime: uint64(_expireTime + block.timestamp),
            status: false
        }));

        emit ExecutedImitation (
            _nda[0],
            _nda[1],
            _holderContract,
            _recipient,
            _sentAmount,
            uint64(block.timestamp),
            _expireTime
        );
    }

    function _Agreevote(uint64 key) external {
        if(ImitationDetail[key].expireTime < block.timestamp) revert("ended.");
        Voter storage sender = _voteMaps[key][msg.sender];
        sender.weight = IERC721A(ImitationDetail[key].holderContract).balanceOf(msg.sender);
        require(!sender.voted, "Already Voted");
        require(sender.weight > 0, "GT");
        sender.voted = true;
        ImitationDetail[key].agree += sender.weight;
    }

    function _Disagreevote(uint64 key) external {
        if(ImitationDetail[key].expireTime < block.timestamp) revert("ended.");
        Voter storage sender = _voteMaps[key][msg.sender];
        sender.weight = IERC721A(ImitationDetail[key].holderContract).balanceOf(msg.sender);
        require(!sender.voted, "Already Voted");
        require(sender.weight > 0, "GT");
        sender.voted = true;
        ImitationDetail[key].disagree += sender.weight;
    }
    
    function _withdrawAmount(uint64 key) external nonReentrant onlyOwner {
        if(ImitationDetail[key].expireTime > block.timestamp) revert("Voting is under way.");
        require(ImitationDetail[key].agree > ImitationDetail[key].disagree, "rejected");
        require(!ImitationDetail[key].status, "already withdraw");
        uint256 Amount = ImitationDetail[key].sentAmount;
        address payable Target = ImitationDetail[key].recipient;
        Target.transfer(Amount);
        ImitationDetail[key].status = true;
    }

    function callNow() public view returns(uint256) {
        return block.timestamp;
    }