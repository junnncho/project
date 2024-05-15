// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "./Ballot.sol";

contract MainDao {
    uint public ballotId = 0;
    mapping (uint => address) public Ballots;
    uint32 public constant VOTING_DURATION = 3 days;
    function createElection (string[] memory _nda, bytes32[] memory _proposalName, address _tokenContract) public {
        Ballot ballot = new Ballot(_nda, _proposalName, _tokenContract);
        Ballots[ballotId] = address(ballot);
        ballotId++;
    }

    uint8 public quorum;

    mapping(bytes32 => bool) public executedTx;

    struct ExecutedPermitted {
        address target;
        bytes data;
        uint256 value;
        uint256 executionTimestamp;
        address executor;
    }

    struct ExecutedVoting {
        address target;
        bytes data;
        uint256 value;
        uint256 nonce;
        uint256 timestamp;
        uint256 executionTimestamp;
        bytes32 txHash;
        bytes[] sigs;
    }

    ExecutedVoting[] internal executedVoting;

        event Executed(
        address indexed target,
        bytes data,
        uint256 value,
        uint256 indexed nonce,
        uint256 timestamp,
        uint256 executionTimestamp,
        bytes32 txHash,
        bytes[] sigs
    );


    constructor(string memory _name, string memory _symbol, uint8 _quorum) {
        require(
            _quorum >= 1 && _quorum <= 100,
            "DAO: quorum should be 1 <= q <= 100"
        );
        quorum = _quorum;
    }

        function executePermitted(
        address _target,
        bytes calldata _data,
        uint256 _value
    ) external returns (bool) {
        require(checkSubscription(), "DAO: subscription not paid");

        require(permitted.contains(msg.sender), "DAO: only for permitted");

        executedPermitted.push(
            ExecutedPermitted({
                target: _target,
                data: _data,
                value: _value,
                executionTimestamp: block.timestamp,
                executor: msg.sender
            })
        );

        emit ExecutedP(_target, _data, _value, msg.sender);

        if (_data.length == 0) {
            payable(_target).sendValue(_value);
        } else {
            if (_value == 0) {
                _target.functionCall(_data);
            } else {
                _target.functionCallWithValue(_data, _value);
            }
        }

        return true;
    }

    function execute(
        address _target,
        bytes calldata _data,
        uint256 _value,
        uint256 _nonce,
        uint256 _timestamp,
        address tokenContract,
        bytes[] memory _sigs
    ) external  returns (bool) {
        require(checkSubscription(), "DAO: subscription not paid");

        require(IERC721(tokenContract).balanceOf(msg.sender) > 0, "you dont have Governace token in your wallet");

        require(
            _timestamp + VOTING_DURATION >= block.timestamp,
            "DAO: voting is over"
        );

        bytes32 txHash = getTxHash(_target, _data, _value, _nonce, _timestamp);

        require(!executedTx[txHash], "DAO: voting already executed");

        require(_checkSigs(_sigs, txHash), "DAO: quorum is not reached");

        executedTx[txHash] = true;

        executedVoting.push(
            ExecutedVoting({
                target: _target,
                data: _data,
                value: _value,
                nonce: _nonce,
                timestamp: _timestamp,
                executionTimestamp: block.timestamp,
                txHash: txHash,
                sigs: _sigs
            })
        );

        emit Executed(
            _target,
            _data,
            _value,
            _nonce,
            _timestamp,
            block.timestamp,
            txHash,
            _sigs
        );

        if (_data.length == 0) {
            payable(_target).sendValue(_value);
        } else {
            if (_value == 0) {
                _target.functionCall(_data);
            } else {
                _target.functionCallWithValue(_data, _value);
            }
        }

        return true;
    }

        function getTxHash(
        address _target,
        bytes calldata _data,
        uint256 _value,
        uint256 _nonce,
        uint256 _timestamp
    ) public view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    address(this),
                    _target,
                    _data,
                    _value,
                    _nonce,
                    _timestamp,
                    block.chainid
                )
            );
    }

    function _checkSigs(bytes[] memory _sigs, bytes32 _txHash)
        internal
        view
        returns (bool)
    {
        bytes32 ethSignedHash = _txHash.toEthSignedMessageHash();

        uint256 share = 0;

        address[] memory signers = new address[](_sigs.length);

        for (uint256 i = 0; i < _sigs.length; i++) {
            address signer = ethSignedHash.recover(_sigs[i]);

            signers[i] = signer;
        }

        require(!_hasDuplicate(signers), "DAO: signatures are not unique");

        for (uint256 i = 0; i < signers.length; i++) {
            share += balanceOf(signers[i]);
        }

        if (share * 100 < totalSupply() * quorum) {
            return false;
        }

        return true;
    }

    function checkSubscription() public view returns (bool) {
        if (
            IFactory(factory).monthlyCost() > 0 &&
            IFactory(factory).subscriptions(address(this)) < block.timestamp
        ) {
            return false;
        }

        return true;
    }


}