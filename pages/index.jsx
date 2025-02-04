// This is the BlankIndex component.
// It is the top-level component so it is being rendered as the Index page.

import Head from 'next/head'
import { useEffect, useState } from 'react'
import {
  BlankButton,
  BlankLayout,
  NewWindowLink,
  TWCenteredContent
} from '../components'

const BlankIndex = () => {
  const [whitelistCount, setWhitelistCount] = useState(0)
  
  useEffect(() => {
    const airtable = require('airtable');
    airtable.configure({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_READONLY_API_KEY })
    const airtableBase = airtable.base('appnTfhh0fxCM8pBx');
    const whitelist = airtableBase.table('Whitelist');
    let totalWhiteListCount = 0
    whitelist.select({
      pageSize: 100
    }).eachPage(function page(records, fetchNextPage) {
      totalWhiteListCount += records.length
      setWhitelistCount(totalWhiteListCount)
      fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    })
  }, [])
  
  useEffect(() => {
    const countElement = document.getElementById('canvas-count');
    const current = 1000 - whitelistCount;
    const total = 1000;
    let count = total;
    let timeouts = [];
  
    const tick = () => {
      count = parseInt(countElement.innerHTML);
      if (count <= current) count = current + 1;
      countElement.innerHTML = `${count - 1}`;
  
      if (count > current + 1) {
        let time = 4;
        timeouts.push(setTimeout(tick, time));
        timeouts.push(setTimeout(tick, time));
      }
    }
  
    tick();
    
    return () => {
      for (const timeout of timeouts) {
        window.clearTimeout(timeout);
      }
    };
  }, [whitelistCount]);

  return (
    <div>
      <Head>
        <title>Blank.Foundation</title>
        <meta name="description" content="United by a blank canvas." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlankLayout>
        <TWCenteredContent>
          <div className='container mx-auto w-11/12 sm:w-full md:flex'>
            <div className="mr-6 mb-12 md:w-2/12 flex flex-none bg-center bg-contain bg-no-repeat text-center tracking-widest" style={{width: "360px", height: "330px", backgroundImage: `url("/nft.png")`}}>
              <TWCenteredContent>
                <div><span id="canvas-count">1000</span> / 1000</div>
                <div className="text-gray-500 pt-3">Remaining</div>
              </TWCenteredContent>
            </div>
            <div className="flex-none mx-auto w-full md:w-10/12 my-12 md:my-12">
              <h1 className="text-2xl mb-6 font-semibold">United by a blank canvas</h1>
              <p className="text-md mb-3">
                Blank is a web3 community united by 
                <br/>
                10,000 blank NFTs. Our first 1,000 
                <br/>
                members mint for free, and together
                <br/>
                we vote on how they evolve.
              </p>
      
              <BlankButton
                classMap={{ padding: "" }}
              >
                <NewWindowLink
                  href="https://discord.gg/EvyXJHxJaw"
                >
                  <div
                    className='px-12 py-2'
                  >
                    Join
                  </div>
                </NewWindowLink>
              </BlankButton>
      
              <BlankButton
                classMap={{
                  background: "bg-gray-300 text-gray-900",
                  padding: "",
                  marginLeft: "ml-6"
                }}
              >
                <NewWindowLink
                  href="https://medium.com/@blankfdn"
                >
                  <div 
                    className='px-9 py-2'
                  >
                    Learn More
                  </div>
                </NewWindowLink>
              </BlankButton>
            </div>
          </div>
        </TWCenteredContent>
      </BlankLayout>
    </div>
  );
}

export default BlankIndex;