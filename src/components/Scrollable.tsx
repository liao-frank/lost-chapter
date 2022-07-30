import classNames from 'classnames'
import { PropsWithChildren, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

export const Scrollable = ({
  children,
  className,
}: PropsWithChildren<{
  className?: string
}>) => {
  const [isScrollingBottom, setIsScrollingBottom] = useState(false)
  const [isScrollingTop, setIsScrollingTop] = useState(false)

  const maskGradient = `linear-gradient(${
    isScrollingTop ? 'transparent' : 'black'
  } 0%, black 1.5rem, black calc(100% - 1.5rem), ${
    isScrollingBottom ? 'transparent' : 'black'
  } 100%)`

  return (
    <Scrollbars
      autoHide={false}
      className={className}
      onScrollFrame={(values) => {
        if (values.clientHeight < values.scrollHeight) {
          setIsScrollingBottom(values.top < 1)
          setIsScrollingTop(values.top > 0)
        }
      }}
      renderThumbHorizontal={Thumb}
      renderThumbVertical={Thumb}
      renderTrackHorizontal={HorizontalTrack}
      renderTrackVertical={VerticalTrack}
      renderView={(props: any) => {
        return (
          <div
            {...props}
            style={{
              ...props.style,
              WebkitMaskImage: maskGradient,
              maskImage: maskGradient,
            }}
          ></div>
        )
      }}
      style={{
        height: undefined,
        width: undefined,
      }}
    >
      {children}
    </Scrollbars>
  )
}

const HorizontalTrack = (props: any) => {
  return (
    <div
      {...props}
      className={classNames(props.className, 'absolute bottom-0.5 inset-x-0.5')}
      style={{
        ...props.style,
        height: TRACK_SIZE,
      }}
    ></div>
  )
}

const Thumb = (props: any) => {
  return (
    <div
      {...props}
      className={classNames(
        props.className,
        'bg-[#785a28] rounded-full active:bg-[#463714] hover:bg-[#c8aa6e]'
      )}
    ></div>
  )
}

const VerticalTrack = (props: any) => {
  return (
    <div
      {...props}
      className={classNames(props.className, 'absolute inset-y-0.5 right-0.5')}
      style={{
        ...props.style,
        width: TRACK_SIZE,
      }}
    ></div>
  )
}

const TRACK_SIZE = '0.4375rem'
