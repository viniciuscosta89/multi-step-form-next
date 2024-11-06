import * as motion from 'framer-motion/client'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring' }}
    >
      <div className="bg-white flex flex-col gap-5 lg:gap-10 py-8 lg:pt-10 lg:pb-4 px-6 lg:px-24 -mt-16 lg:mt-0 rounded-lg shadow-[0_25px_40px_-20px_hsl(0deg_0%_0%_/_9.51%)] lg:shadow-none mb-24 lg:mb-0 lg:h-full lg:w-full">
        {children}
      </div>
    </motion.div>
  )
}
