const { ethers } = require("hardhat");

async function main() {
    const DURATION_DAYS = 30;

    const CourseReward =
        await ethers.getContractFactory(
            "CourseReward"
        );

    const contract =
        await CourseReward.deploy(
            DURATION_DAYS,
            {
                value: ethers.parseEther("10")
            }
        );

    await contract.waitForDeployment();

    console.log(
        "Contract deployed at:",
        await contract.getAddress()
    );

    console.log(
        "Owner:",
        await contract.owner()
    );

    console.log(
        "Balance:",
        ethers.formatEther(
            await contract.getBalance()
        ),
        "ETH"
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
