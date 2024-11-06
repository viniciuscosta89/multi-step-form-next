interface HeadingProps {
  title: string
  paragraph: string
}

export default function Heading({ title, paragraph }: HeadingProps) {
  return (
    <>
      <div className="flex flex-col gap-2 lg:gap-3">
        <h1 className="text-2xl lg:text-[2rem] font-bold">{title}</h1>
        <p className="text-coolGray">{paragraph}</p>
      </div>
    </>
  )
}
