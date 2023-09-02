
export async function fetchNFTImages(contractAddress: String, tokenId: String){
    try {
        const response = await fetch("https://api.quicknode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "QN_ef3f0af6cbe74addbc3e6ac4251e6d5a"
            },
            body: JSON.stringify({
                query: `query Nft($contractAddress: String!, $tokenId: String!) {
                ethereum {
                    nft(contractAddress: $contractAddress, tokenId: $tokenId) {
                        uploads {
                            height
                            url
                            width
                        }
                    }
                }
            }
          `,
            variables: {
                "contractAddress": contractAddress,
                "tokenId": tokenId
            },
            })
        });
        const data = await response.json();
        const url = data?.data?.ethereum?.nft?.uploads?.[1]?.url || null;
        return url;
    } catch (error) {
      console.error(error);
    }
};

