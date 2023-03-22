import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Blog - Carverna labs</title>
      </Head>

      <main className="flex justify-between items-center w-full max-w-6xl mx-auto px-8 min-h-screen">
        <section className="max-w-2xl text-[#E1E1E6]">
          <span className="font-bold text-2xl">👏 Hey devs, bem-vindos ao</span>

          <h1 className="mt-10 font-black text-7xl">
            Blog da <br /> Carvena labs
          </h1>

          <p className="mt-6 text-2xl">
            Um blog com o objetivo de te ajudar na evolução contínua do seu
            conhecimento. <br />
          </p>
        </section>

        <img src="/images/avatar.svg" alt="girl coding." />
      </main>
    </>
  )
}
