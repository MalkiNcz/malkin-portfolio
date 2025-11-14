import Card from "@/components/card"

export default function Projects() {

    return (
        <section id="projects" className="py-24 px-6 max-w-4xl mx-auto max-h-screen">
                <h2 className="text-4xl font-bold mb-8">Projects</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card title="Žižkovská lajna" description="Top-down action shooter game." img="/zl-1.jpg" rdr="https://malkincz.github.io/zizLajna/" />
                  <Card title="Risk realm" description="Online casino simulator" rdr="https://github.com/KoblizekXD/riskrealm" img="/blackjack.jpg"/>
                  <Card title="Cock down shooter" description="Relaxing game where you shoot chickens down." rdr="https://github.com/Chigga-Solutions/Cock-Down-Shooter" img="/cds.jpg" />
                  <Card title="Termio - quizzes" description="Quizzes implemented in Termio.cz - working on" rdr="https://termio.cz" img="/termio.jpg" />
                </div>
              </section>
    )
}