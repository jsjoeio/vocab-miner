import { AnimatePresence, motion } from "framer-motion";

type CurrentWordProps = {
  word: string;
};

export function CurrentWord({ word }: CurrentWordProps) {
  return (
    <div className="relative flex justify-center items-center overflow-hidden w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={word}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <span className="text-6xl font-semibold my-16 block">{word}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
