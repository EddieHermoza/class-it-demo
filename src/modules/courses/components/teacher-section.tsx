import Image from 'next/image'

interface Teacher {
  name: string
  lastName: string
  title: string
  avatarUrl: string
  bio: string
}

interface TeacherSectionProps {
  teacher: Teacher
}

export function TeacherSection({ teacher }: TeacherSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-xl font-bold sm:mb-7 sm:text-2xl md:mb-8 md:text-3xl">
        Sobre nuestro experto
      </h2>

      <div className="p-4 backdrop-blur-sm sm:p-6 md:p-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:gap-8">
          <div className="shrink-0">
            <div className="relative">
              <div className="from-primary/40 to-primary/20 absolute inset-0 rounded-full bg-linear-to-br blur-xl" />
              <div className="relative h-24 w-24 overflow-hidden rounded-full sm:h-28 sm:w-28 md:h-36 md:w-36">
                <Image
                  src={teacher.avatarUrl || '/placeholder.svg'}
                  alt={`${teacher.name} ${teacher.lastName}`}
                  width={144}
                  height={144}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="mb-2 text-lg font-bold sm:text-xl md:text-2xl">
              {teacher.name} {teacher.lastName}
            </h3>
            <p className="text-primary mb-4 text-base font-medium sm:mb-5 sm:text-lg md:mb-6">
              {teacher.title}
            </p>
            <p className="text-sm leading-relaxed whitespace-pre-line sm:text-base">
              {teacher.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
