import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import Modal from "@/components/modal";

export default function Contact() {
    const form = useRef<HTMLFormElement>(null);
    const [modal, setModal] = useState<{ type: string; msg: string } | null>(null);
    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;
    
        const timestampInput = form.current.querySelector<HTMLInputElement>(
          'input[name="time"]'
        );
        if (timestampInput) {
          timestampInput.value = new Date().toISOString();
        }
    
        try {
          await emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            form.current,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
          );
          form.current.reset();
          setModal({ type: "Success", msg: "Email was successfully sent!" });
          setTimeout(() => setModal(null), 3000);
        } catch (err) {
          console.error("Failed to send email:", err);
          setModal({ type: "Error", msg: "Failed to send email!" });
          setTimeout(() => setModal(null), 3000);
        }
      };

    return (
        <section id="contact" className="py-24 px-6 max-w-4xl mx-auto max-h-screen">
        <h2 className="text-4xl font-bold mb-8">Contact me</h2>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col gap-4 bg-[var(--background)] p-6 rounded-2xl cursor-none border max-w-md"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="p-2 rounded bg-[var(--background)] text-[var(--foreground)] cursor-none border-2 border-neutral-500 focus:border-neutral-300 outline-0"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-2 rounded bg-[var(--background)] text-[var(--foreground)] cursor-none border-2 border-neutral-500 focus:border-neutral-300 outline-0"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-2 rounded bg-[var(--background)] text-[var(--foreground)] cursor-none border-2 border-neutral-600 focus:border-neutral-300 outline-0"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="p-2 rounded bg-[var(--background)] text-[var(--foreground)] cursor-none border-2 border-neutral-500 focus:border-neutral-300 outline-0"
            required
          />
          <input type="hidden" name="time" value={Date.now()} />
          <button
            type="submit"
            className="bg-[var(--background)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition hover:border-white text-[var(--foreground)] py-2 px-4 rounded cursor-none border-2 border-neutral-600 duration-500"
          >
            Send
          </button>
        </form>
        {modal && <Modal type={modal.type} msg={modal.msg} />}
      </section>
    )
}