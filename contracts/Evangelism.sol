pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";


contract Evangelism is AragonApp {

    /// Events
    event Believed(
        string cyberAddress,
        string cosmosAddress,
        address ethereumAddress,
        string nickname,
        string keybase,
        string github
    );
    event Blessed(string nickname);
    event Unblessed(string nickname);

    /// State
    enum EvangelistStatus {Believed, Blessed, Unblessed}

    struct Evangelist {
        string cyberAddress;
        string cosmosAddress;
        address ethereumAddress;
        string nickname;
        string keybase;
        string github;
        EvangelistStatus status;
    }

    address public foundation;
    Evangelist[] public evangelists;
    mapping(string => uint256) private evangelistIdByNicknameIndex;
    mapping(string => bool) private evangelistNicknameUniqIndex;

    /// ACL
    bytes32 constant public FOUNDER_ROLE = keccak256("FOUNDER_ROLE");

    function initialize(address _foundation) public onlyInit {
        foundation = _foundation;
        initialized();
    }

    /**
     * @notice My name is `_nickname` and I want to believe in Cyber
     */
    function believe(
        string memory _cyberAddress,
        string memory _cosmosAddress,
        string memory _nickname,
        string memory _keybase,
        string memory _github
    )
        public
        payable
    {
        require(msg.value >= 0.01 ether, "provide more fee");
        require(bytes(_cyberAddress).length == 44, "wrong cyber address");
        require(bytes(_cosmosAddress).length == 45, "wrong cosmos address");
        require(bytes(_nickname).length >= 3, "wrong nickname");
        require(bytes(_keybase).length >= 3, "wrong keybase account");
        require(bytes(_github).length >= 3, "wrong github account");
        require(evangelistNicknameUniqIndex[_nickname] == false, "evangelist already exist");

        Evangelist memory e = (Evangelist(
        {
            cyberAddress: _cyberAddress,
            cosmosAddress: _cosmosAddress,
            ethereumAddress: msg.sender,
            nickname: _nickname,
            keybase: _keybase,
            github: _github,
            status: EvangelistStatus.Believed
        }));
        evangelistIdByNicknameIndex[_nickname] = evangelists.length;
        evangelistNicknameUniqIndex[_nickname] = true;
        evangelists.push(e);

        emit Believed(
            _cyberAddress,
            _cosmosAddress,
            msg.sender,
            _nickname,
            _keybase,
            _github
        );
    }

    /**
     * @notice Bless `_nickname`
     */
    function bless(string memory _nickname)
        public
        auth(FOUNDER_ROLE)
    {
        require(evangelistNicknameUniqIndex[_nickname] == true, "evangelist should exist");
        uint256 evangelistId = evangelistIdByNicknameIndex[_nickname];
        evangelists[evangelistId].status = EvangelistStatus.Blessed;

        emit Blessed(_nickname);
    }

    /**
     * @notice Unbless `_nickname`
     */
    function unbless(string memory _nickname)
        public
        auth(FOUNDER_ROLE)
    {
        require(evangelistNicknameUniqIndex[_nickname] == true, "evangelist should exist");
        uint256 evangelistId = evangelistIdByNicknameIndex[_nickname];
        address ethereumAddress = evangelists[evangelistId].ethereumAddress;
        evangelists[evangelistId].status = EvangelistStatus.Unblessed;

        emit Unblessed(_nickname);
    }

    function collect() public {
        address(foundation).transfer(address(this).balance);
    }
}