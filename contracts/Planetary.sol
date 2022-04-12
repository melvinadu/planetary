//this contract is using the EIP-721 standard - https://eips.ethereum.org/EIPS/eip-721
// and OpenZeppelin
// to setup OZ - https://docs.openzeppelin.com/contracts/4.x/
// the standard we are using again is 721 and more info can be found here - https://docs.openzeppelin.com/contracts/4.x/erc721
// but we'll be using the OZ Wizard here - https://docs.openzeppelin.com/contracts/4.x/wizard

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Planetary is ERC721, ERC721URIStorage {
    constructor() ERC721("Planetary", "PLNT") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}