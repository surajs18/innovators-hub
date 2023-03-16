import BackButton from "../../../../components/BackButton";
import LoginHeader from "../../../../components/LoginHeader";
import Card from "../../../../components/Card";

function investmenthistory() {

    const initial = [{ projectName: "ABC", projectId: "5", startupName: "ABC", }, { projectName: "DEF", projectId: "6", startupName: "DEF", }, { projectName: "EF", projectId: "7", startupName: "EF", }, { projectName: "DF", projectId: "8", startupName: "DF", }, { projectName: "DE", projectId: "9", startupName: "DE", },{ projectName: "10", projectId: "10", startupName: "10", },]

    return (
        <>
            <BackButton/>
            <LoginHeader/>
            <div className="mb-[3rem] pb-[3rem] md:mb-[1rem] md:pb-[1rem]">
                <h2 className="select-none my-[.5rem] py-[.5rem] text-3xl cursor-default text-center">Investment History</h2>
                <div className="ml-[5%] pl-[5%] flex flex-wrap gap-4 grid-cols-2">
                    {initial.map((i) => (
                        <Card head={i.projectName} key={i.projectId} para={i.startupName} url={`/user/investments/investmenthistory/${i.projectId}`} />   
                    ))}
                </div>
        </div>
        </>
    );
}

export default investmenthistory;