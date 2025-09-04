function PropertyPreview(){
    return <>
        <>
            <>PropertyName</>
            <>bought: xx tokens 45%</>
        </>
        <img></img>
    </>
}

export function DividendDistribution(){
    const title="";
    const subtitle="Distributing tokens to ";
    return <main>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <>//Horizontal
            <PropertyPreview></PropertyPreview>
            <button>Change</button>
        </>
        <form>
            //hidden input selected property
            <label>Income pool</label>
            //group raw or by value percentage
            <input></input>
            <p>You have {walletBalance} ETH.</p>
            <label>Dividend per token share</label>
            <p>{divPerToken}</p>
            <input type="submit">Confirm</input>
        </form>
    </main>;
}