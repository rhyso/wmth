'use client'

import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import styles from './page.module.css'

const Home = () => {

  const ref = useRef(null);

  const onClear = () => {
    ref.current.value = "";
  };

  const retainedInside = 0.56
  const retainedOutside = 0.64
  const numDaysWorkedInMonth = 18.3

  const [disabled, setDisabled] = useState(true)
  const [results, setResults] = useState("")

  const [formData, setFormData] = useState({
    inside: null,
    outside: null
  })

  const [calculatedRate, setCalculatedRate] = useState({
    inside: 0,
    outside: 0
  })

  const performCalcInside = (rate) => {
    const per_day = (Number(rate) * retainedInside)
    const per_month = per_day * numDaysWorkedInMonth

    return per_month.toFixed(2)

    //0.64 for outside kept
    //0.56 for inside kept
  }

  const performCalcOutside = (rate) => {
    const per_day = (Number(rate) * retainedOutside)
    const per_month = per_day * numDaysWorkedInMonth

    return per_month.toFixed(2)
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    const inside = Number(formData.inside)
    const outside = Number(formData.outside)

    setCalculatedRate({inside: performCalcInside(inside), outside: performCalcOutside(outside)})

  }

  useEffect(() => {
    console.log(!formData.inside || !formData.outside)
    let text;
    if(formData.outside && formData.inside){
      text = `Inside monthly: £${calculatedRate.inside}, 
        
      Outside monthly: £${calculatedRate.outside}`
    }
    else if(formData.inside){
      text = `Inside monthly: £${calculatedRate.inside}`
    }
    else if(formData.outside){
     text = `Outside monthly: £${calculatedRate.outside}`
    }

    setResults(text)
  },[calculatedRate])

  useEffect(()=> {
    console.log(formData.inside)

    setDisabled(formData.inside===null  && formData.inside===null )
  },[formData])

  const displayResults = (type) => {
    console.log(type)
   const text =  type === "inside" ? `Inside monthly: £${calculatedRate.inside}` : `Outside monthly: £${calculatedRate.outside}`
   setResults(text)
   console.log(results)

  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>

        <div>
          <h1>WMTH</h1>
        </div>
      </div>

      <div className={styles.center}>
        <h1 className={styles.headline}> Whats my take home?</h1>

         
      </div>
      <div className={styles.results}>
            {results}
          </div>
      <div >
        <form           
          onSubmit={handleSubmit}
          className={styles.entryform}>
          <section className={styles.formSection}>
            <label className={styles.label}>Inside IR35 (day Rate)</label>
            <input
            className={styles.inputClass}
            type="number"
            placeholder="£500"
            disabled={false}
            onChange={(e) => setFormData({...formData, inside: e.target.value})}
            value={formData.inside} 
            ref={ref}
            />
          </section>
          <section className={styles.formSection}>
            <label className={styles.label}>Outside IR35 (day rate)</label>
            <input
            className={styles.inputClass}
            type="number"
            placeholder="£600"
            disabled={false}
            value={formData.outside}
            onChange={(e) => setFormData({...formData, outside: e.target.value})} 
            name="inside" 
            id="title" 
            ref={ref}
            />
          </section>
          <div className={styles.break}></div>
          <input
          type="submit"
          className={styles.submitClass}
          value="Calculate"
          disabled={disabled}
          />
        </form>

      </div>
 
      {/* <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>  */}
    </main>
  )
}

export default Home