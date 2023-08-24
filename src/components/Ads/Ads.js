 import "./ads.scss"
 export default function Ads(){
    return(
        <div className="ads mt-3">
            <p className="text-secondary">Ads</p>
            <div className="ads-border">
                <img
                    className="me-2 mb-1"
                    src="/imgs/ads.svg"
                    width="100%"
                    alt="React Bootstrap logo"
                />
            </div>
        </div>
    )
}