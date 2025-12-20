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
      <h2 className="mb-8 text-3xl font-bold">Sobre nuestro experto</h2>

      <div className="p-8 backdrop-blur-sm">
        <div className="flex flex-col items-start gap-8 md:flex-row">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative">
              <div className="from-primary/40 to-primary/20 absolute inset-0 rounded-full bg-linear-to-br blur-xl" />
              <div className="border-primary shadow-primary/20 relative h-36 w-36 overflow-hidden rounded-full border-4 shadow-lg">
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

          {/* Info */}
          <div className="flex-1">
            <h3 className="mb-2 text-2xl font-bold">
              {teacher.name} {teacher.lastName}
            </h3>
            <p className="text-primary mb-6 text-lg font-medium">
              {teacher.title}
            </p>
            <p className="text-base leading-relaxed whitespace-pre-line">
              {teacher.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
