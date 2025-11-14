
import Card from "@/components/card";

export default function Tasks() {
    return (
        <section id="tasks" className="py-24 px-6 max-w-4xl mx-auto min-h-screen md:max-h-screen">
        <h2 className="text-4xl font-bold mb-8">Tasks</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card title={"Edu tech days"} description={"HTML and CSS"} rdr="https://malkincz.github.io/edutechdays/" img="/etd.jpg" />


        </div>
      </section>
    )
}