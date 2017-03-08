pragma solidity ^0.4.6;

import "B.sol";

contract A {

    mapping (uint => address) myMap;
    address[] public myArray;
    
    function myFunction(){
        B b = new B();
        myMap[0] = b;
        myArray.push(b);
    }
    
    function getMyArrayLength() returns (uint){
        return myArray.length;
    }
}