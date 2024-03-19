// .jsxファイル内の先頭に宣言
import { useState, useEffect } from "preact/hooks";
import "./Card.css"

export default function Card(props) {
    const repoUrl = "https://github.com/Mr-Ojii/" + props.repoName;
    const apiUrl = "https://api.github.com/repos/Mr-Ojii/" + props.repoName;
    const releasesApiUrl = apiUrl + "/releases" ;

    const [downloadUrl, setDownloadUrl] = useState(repoUrl + "/releases/latest");
    const [releaseName, setReleaseName] = useState("最新版をダウンロード");

    useEffect(() => {
        fetch(releasesApiUrl)
        .then(response => response.json())
        .then(
            releasesData => {
                if (releasesData !== undefined && releasesData[0] !== undefined && releasesData[0].assets !== undefined && releasesData[0].assets[0] !== undefined)
                {
                    for (let i = 0; i < releasesData[0].assets.length; i++)
                    {
                        if (releasesData[0].assets[i].name.includes(props.search))
                        {
                            setDownloadUrl(releasesData[0].assets[i].browser_download_url);
                            setReleaseName(releasesData[0].name + "をダウンロード");
                            break;
                        }
                    }
                }
                else if(releasesData !== undefined && releasesData.message !== undefined)
                {
                    //setReleaseName("APIのレートリミットに引っかかっています");
                }
                else
                {
                    setDownloadUrl("javascript:void(0)");
                    setReleaseName("リリースがありません");
                }
            }
        )
    }, []);

    return(
        <li className="link-card">
            <a name={props.name} href={repoUrl}>
                <h3>
                    {props.name}
                </h3>
                <p>
                    {props.body}
                </p>
                {
                    props.nicovideoID ?
                    <p><a href={`https://www.nicovideo.jp/watch/${props.nicovideoID}`} target="_blank" rel="noreferrer noopener"><wbr/>ニコ動</a></p> :
                    <></>
                }
                <div className="release-card">
                    <a href={downloadUrl}>{releaseName}</a>
                </div>
            </a>
        </li>
    )
}