import { NFTStorage } from 'nft.storage'
import React from "react";
import { ethers } from "ethers";
import { useState } from 'react';

export default function App() {

  const [imageError, setImageError] = useState(false);

  const token = process.env.NFTSTORAGE_KEY;

  const handleImageUpload = async (image) => {
    const storage = new NFTStorage({ token })

    try {
      const metadata = await storage.store({
        name: "nftImage",
        description:
          'Testing nft.storage store.',
        image: image,
      })
      console.log({ 'IPFS URL for the metadata': metadata.url })
      console.log({ 'metadata.json contents': metadata.data })
      console.log({ 'metadata.json contents with IPFS gateway URLs': metadata.embed() })
    } catch {
      setImageError(true);
    }
  }

  const handleNFTGeneration = async () => {
    if(window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send("eth_requestAccounts", []);
    } else {
      window.alert("Você precisa instalar a extensão da MetaMask para conseguir criar o seu NFT.");
    }
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          Crie sua NFT
        </div>

        <div>
          <form className="form">
            <label>
              Descrição:
            </label>
            <input />
            <label>
              Imagem:
            </label>
            <input 
              type="file"
              label="Upload Single File"
              uploadFileName="nftImage"
              onChange={(e) => handleImageUpload(e.target.files[0])} />
              {imageError && <p>Erro ao carregar imagem, tente novamente.</p>}
            <button className="mintButton" onClick={handleNFTGeneration}>
              Finalizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
