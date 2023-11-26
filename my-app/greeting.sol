//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract RemixContract {
    string message;

    constructor() {
        message = "Hello Ashish";
    }

    function getGreeting() public view returns (string memory) {
        return message;
    }

    function setGreeting(string memory _message) public {
        message = _message;
    }

    function defaultGreeting() public pure returns (string memory str) {
        return ("GM From Ashish");
    }
}
