import { motion } from "framer-motion";

export function CopiedText({ text }: { text: string }) {
    const printText = text !== "" ? "Copied link to clipboard" : "No link to copy";

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
    };

    return (
        <div
            className="fixed h-screen w-screen inset-0 flex justify-center items-end z-[100] p-4"
            style={{ pointerEvents: "none" }}
        >
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
                transition={{ duration: 0.5 }}
                style={{ pointerEvents: "auto" }} // Allow interaction with the box itself
                className="rounded-2xl bg-purple-600 p-3 text-white"
            >
                {printText}
            </motion.div>
        </div>
    );
}
