"use client"

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import Image from "next/image"

const graph = () => {
  return (
    <div className="relative h-screen w-full">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
        pinch={{ step: 5 }}
        panning={{ velocityDisabled: true }}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{ width: "100%", height: "100%" }}
        >
          <Image
            src="/images/graph.png"
            alt="Knowledge graph"
            layout="fill"
            style={{ objectFit: "contain" }}
            sizes="100vw"
            priority
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default graph
