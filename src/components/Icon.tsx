import classNames from 'classnames'

import lostChapterBit1GlowPath from '../images/lost-chapter-bit-1-glow.png'
import lostChapterBit1Path from '../images/lost-chapter-bit-1.png'
import lostChapterBit2GlowPath from '../images/lost-chapter-bit-2-glow.png'
import lostChapterBit2Path from '../images/lost-chapter-bit-2.png'
import lostChapterBit3GlowPath from '../images/lost-chapter-bit-3-glow.png'
import lostChapterBit3Path from '../images/lost-chapter-bit-3.png'
import lostChapterHardGlowPath from '../images/lost-chapter-hard-glow.png'
import lostChapterPagesPath from '../images/lost-chapter-pages.png'
import lostChapterRays1Path from '../images/lost-chapter-rays-1.png'
import lostChapterRays2Path from '../images/lost-chapter-rays-2.png'
import lostChapterRays3Path from '../images/lost-chapter-rays-3.png'
import lostChapterRays4Path from '../images/lost-chapter-rays-4.png'
import lostChapterSoftGlowPath from '../images/lost-chapter-soft-glow.png'
import './Icon.scss'

export const LostChapterIcon = ({
  active,
  className,
  height,
  size,
  width,
}: IconProps & { active?: boolean }) => {
  return (
    <div
      className={classNames(
        'icon lost-chapter-icon',
        active && 'active',
        className
      )}
      style={{ height: height || size, width: width || size }}
    >
      {/* Main pages + glows. */}
      <div className="lost-chapter-icon-levitate">
        <div className="lost-chapter-icon-glow">
          <div style={{ backgroundImage: `url(${lostChapterSoftGlowPath})` }} />
          <div style={{ backgroundImage: `url(${lostChapterHardGlowPath})` }} />
        </div>
        <div style={{ backgroundImage: `url(${lostChapterPagesPath})` }} />
      </div>
      {/* Page bits + glows. */}
      <div className="lost-chapter-icon-levitate">
        <div
          className="lost-chapter-icon-glow"
          style={{ backgroundImage: `url(${lostChapterBit1GlowPath})` }}
        />
        <div style={{ backgroundImage: `url(${lostChapterBit1Path})` }} />
      </div>
      <div className="lost-chapter-icon-levitate">
        <div
          className="lost-chapter-icon-glow"
          style={{ backgroundImage: `url(${lostChapterBit2GlowPath})` }}
        />
        <div style={{ backgroundImage: `url(${lostChapterBit2Path})` }} />
      </div>
      <div className="lost-chapter-icon-levitate">
        <div
          className="lost-chapter-icon-glow"
          style={{ backgroundImage: `url(${lostChapterBit3GlowPath})` }}
        />
        <div style={{ backgroundImage: `url(${lostChapterBit3Path})` }} />
      </div>
      {/* Rays. */}
      <div className="lost-chapter-icon-levitate lost-chapter-icon-rays">
        <div style={{ backgroundImage: `url(${lostChapterRays1Path})` }} />
        <div style={{ backgroundImage: `url(${lostChapterRays2Path})` }} />
        <div style={{ backgroundImage: `url(${lostChapterRays3Path})` }} />
        <div style={{ backgroundImage: `url(${lostChapterRays4Path})` }} />
      </div>
    </div>
  )
}

interface IconProps {
  className?: string
  height?: number | string
  size?: number | string
  width?: number | string
}
