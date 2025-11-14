export default function About() {
  return (
    <section
      id="about"
      className="py-32 px-6 max-w-4xl mx-auto min-h-screen md:max-h-screen flex flex-col justify-center"
    >
      <div className="space-y-6">
        <h2 className="text-5xl font-extrabold tracking-tight mb-2 color-[var(--foreground)]">
          About Me
        </h2>

        <p className="text-lg text-gray-500 leading-relaxed">
          I’m a backend-focused software developer passionate about crafting reliable,
          high‑performance systems. I love designing clean architectures and solving technical challenges that push my skills forward.
        </p>

        <p className="text-lg text-gray-500 leading-relaxed">
          My work spans from backend infrastructure and automation to creating full web
          solutions — covering everything from system design and implementation to smooth,
          production‑ready deployment.
        </p>

        <p className="text-lg text-gray-500 leading-relaxed">
          I’m driven by constant improvement, a clean engineering mindset, and the goal
          of delivering software that feels fast, durable, and thoughtfully designed.
        </p>
      </div>
    </section>
  );
}
