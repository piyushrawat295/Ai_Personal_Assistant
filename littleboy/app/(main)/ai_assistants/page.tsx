import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import AIassistantsList from '@/services/AIassistantsList'

function AIassistants() {
  return (
    <div className='px-10 mt-20 md:px-28 lg:px-36 xl:px-48'>
        <div className='flex justify-between items-center'>
            <div>
                <h2 className='text-3xl font-bold'>Welcome to the world of AI 🤖</h2>
                <p className='text-xl mt-2'>Choose your AI companion 🚀</p>
            </div>
            <Button />
        </div>
        <div>
            {AIassistantsList.map((assistant, index) => (
                <div key={index}>
                    <Image src={assistant.image} alt={assistant.title} width={100} height={100} />
                    <p>{assistant.name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AIassistants
