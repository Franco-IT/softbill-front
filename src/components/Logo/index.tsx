import Image from 'next/image'

const Logo = () => {
  return <Image src='/images/logo-softbill.png' alt='Logo' width={150} height={60} style={{
    borderRadius: '5px',
  }}/>
}

export default Logo
