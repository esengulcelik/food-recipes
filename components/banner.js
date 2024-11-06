import Image from "next/image";

const banner = () => {
    return (
        <>
            <Image src="/images/sef.jpg" width={500} height={500} quality={100} className="object-cover w-full opacity-80 md:h-[400px] sm:h-[300px] lg:h-[500px] 2xl:h-[700px] h-[200px]" />
        </>
    )
}

export default banner;