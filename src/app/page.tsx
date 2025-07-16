import Banner from '@/app/components/Banner'
import Hero from '@/app/components/Hero'
import { Header } from '@/app/components/ui/Header'
import React from 'react'

const Landing = () => {
  return (
    <main className=''>
        <Header />
        <Hero />
        <Banner />        
    </main>
  )
}

export default Landing