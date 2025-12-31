'use client'

interface Props {
  description: string
  whatYouWillLearn: string
  targetAudience: string
  requirements: string[]
}

export default function CourseInfoSection({
  description,
  whatYouWillLearn,
  targetAudience,
  requirements,
}: Props) {
  return (
    <>
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">
          Descripción del curso online
        </h2>
        <p className="text-sm leading-relaxed text-pretty whitespace-pre-line sm:text-base">
          {description}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">
          ¿Qué voy a aprender?
        </h2>
        <p className="text-sm leading-relaxed text-pretty whitespace-pre-line sm:text-base">
          {whatYouWillLearn}
        </p>
      </section>

      <div className="mb-12 grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="mb-4 text-xl font-bold md:text-2xl">
            ¿A quiénes está dirigido?
          </h2>
          <p className="text-sm leading-relaxed text-pretty break-words whitespace-pre-line sm:text-base">
            {targetAudience}
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold md:text-2xl">Requisitos</h2>
          <ul className="space-y-3">
            {requirements.map((req, i) => (
              <li
                key={i}
                className="text-muted-foreground flex items-start gap-3"
              >
                <span className="bg-primary mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                <span className="text-sm leading-relaxed break-words sm:text-base">
                  {req}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
