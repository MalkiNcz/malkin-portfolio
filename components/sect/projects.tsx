import Card from "@/components/card"

export default function Projects() {

    return (
        <section id="projects" className="py-24 px-6 max-w-4xl mx-auto min-h-screen">
                <h2 className="text-4xl font-bold mb-8">Projects</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card title="Žižkovská lajna" description="Top-down action shooter game." img="/zl-1.jpg" rdr="https://malkincz.github.io/zizLajna/" />
                  <Card title="Risk realm" description="Online casino simulator" rdr="https://github.com/KoblizekXD/riskrealm" />
                  <Card title="Cock down shooter" description="Relaxing game where you shoot chickens down." rdr="https://github.com/Chigga-Solutions/Cock-Down-Shooter" />
                  <Card title="Termio - quizzes" description="Quizzes implemented in Termio.cz - working on" rdr="https://termio.cz" />
                </div>
              </section>
    )
}