import { LostChapterIcon } from './Icon'

export const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen pb-8">
      <LostChapterIcon size="32rem" />
      <div className="mt-12 subtitle">Lost Chapter</div>
      <div className="mt-2 title">Coming Soon</div>
    </div>
  )
}
