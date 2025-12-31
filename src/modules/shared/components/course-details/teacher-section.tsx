import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/modules/shared/components/ui/avatar'

interface Props {
  name: string
  lastName: string
  avatarUrl: string
  title: string
  bio: string
}

export function TeacherSection({
  name,
  lastName,
  avatarUrl,
  title,
  bio,
}: Props) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-xl font-bold sm:mb-7 sm:text-2xl md:mb-8 md:text-3xl">
        Sobre nuestro experto
      </h2>

      <div className="p-4 backdrop-blur-sm sm:p-6 md:p-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:gap-8">
          <Avatar className="size-36">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
              {name.split('')[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="mb-2 text-lg font-bold sm:text-xl md:text-2xl">
              {name} {lastName}
            </h3>
            <p className="text-primary mb-4 text-base font-medium sm:mb-5 sm:text-lg md:mb-6">
              {title}
            </p>
            <p className="text-sm leading-relaxed whitespace-pre-line sm:text-base">
              {bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
