'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })


interface PluginData
{
  name : string;
  repoName : string;
  search : string;
  description : string[];
}

interface HostList
{
  hostName : string;
  pluginsList : PluginData[];
}

const list : HostList[] = [
  {
    hostName : "AviUtl-Plugins",
    pluginsList : [
      {
        name : "ImageMagick-File-Reader",
        repoName : "AviUtl-ImageMagick-File-Reader",
        search : "",
        description : [
          "ImageMagickを使用し、画像ファイルの読み込みを試みる入力プラグイン(連番対応)",
          "バイナリの頒布はしていないため、自身でビルドしていただく必要があります",
        ],
      },
      {
        name : "AviUtl-Shutdown-Plugin",
        repoName : "AviUtl-Shutdown-Plugin",
        search : "",
        description : [
          "起動から30秒後にAviUtlをシャットダウンするプラグイン・スクリプト(ネタプラグイン)",
        ],
      },
      {
        name : "L-SMASH-Works",
        repoName : "L-SMASH-Works-Auto-Builds",
        search : "Mr-Ojii_Mr-Ojii_AviUtl",
        description : [
          "",
        ],
      },
      {
        name : "MotionTracking_MKII_Plus",
        repoName : "MotionTracking_MKII_Plus",
        search : "",
        description : [
          "MaverickTse氏のMotionTracking_MKIIに改良を加えたプラグイン",
          "より新しいアルゴリズムに対応していたり、パフォーマンス改善を行っています"
        ],
      },
    ],
  },
  {
    hostName : "AviUtl-Scripts",
    pluginsList : [
      {
        name : "ImageLoader_M",
        repoName : "AviUtl-ImageLoader_M-Script",
        search : "",
        description : [
          "最大画像サイズを超える画像のロードを行うスクリプト",
        ],
      },
      {
        name : "Bevel_And_Emboss_M",
        repoName : "AviUtl-Bevel_And_Emboss_M-Script",
        search : "",
        description : [
          "gometh兄貴のベベルとエンボス スクリプトを高速化する試み",
        ],
      },
      {
        name : "TA_HideSquare_M",
        repoName : "AviUtl-TA_HideSquare_M-Script",
        search : "",
        description : [
          "四角に隠れて登場するスクリプト",
        ],
      },
    ],
  },
  {
    hostName : "Susie",
    pluginsList : [
      {
        name : "ifheif",
        repoName : "ifheif",
        search : "",
        description : [
          "HEIF(.heif/.heic)/AVIF(.avif)を読み込むためのプラグイン(AviUtlの拡張編集でも使用できます)",
        ],
      },
    ],
  },
]

const PluginItem = (it :PluginData) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url : string = "https://api.github.com/repos/Mr-Ojii/" + it.repoName + "/releases/latest";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.name);
    }

    fetchData().catch((e) => {
      console.error('An error occurred while fetching the data: ', e);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<p>{data ? <a>{data}</a> : "詳細"}</p>);
}

const DLURLItem = (iter : HostList) => {
  return (
  <div key={iter.hostName} className={styles.host}>
    <h2>{iter.hostName}</h2>
    {iter.pluginsList.map((it) => {

      return (<div key={it.name} className={styles.host}>
        <a id={it.name}><h3>{it.name}</h3></a>
        <PluginItem name={it.name} repoName={it.repoName} search={it.search} description={it.description}></PluginItem>
        {
          it.description.map((dsc) => (
            <p key={dsc}>{dsc}</p>
          ))
        }
      </div>)
    })}
  </div>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>aviutl</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.container}>
          <h1>Mr-OjiiのAviUtl関連のプラグイン・スクリプト</h1>
          <h2>目次</h2>
          <nav className={styles.tableOfContents}>
          {
            list.map((iter) => (
              <div key={iter.hostName} className={styles.host}>
                <h2>{iter.hostName}</h2>
                <ul>
                  {iter.pluginsList.map((it) => (
                    <Link key={it.name} href={"#"+it.name}><li>{it.name}</li></Link>
                  ))}
                </ul>
              </div>
            ))
          }
          </nav>
          <h2>一覧</h2>
          <div>
          {
            list.map((iter) => (
              <DLURLItem key={iter.hostName} hostName={iter.hostName} pluginsList={iter.pluginsList}></DLURLItem>
            ))
          }
          </div>
        </div>
      </main>
    </>
  )
}
