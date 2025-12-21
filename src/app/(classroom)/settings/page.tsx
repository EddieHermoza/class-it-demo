'use client'

import type React from 'react'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { Input } from '@/modules/shared/components/ui/input'
import { Textarea } from '@/modules/shared/components/ui/textarea'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/modules/shared/components/ui/avatar'
import { Camera, Save } from 'lucide-react'
import { CURRENT_ROLE } from '@/modules/shared/constants'

type Role = 'STUDENT' | 'TEACHER'

interface StudentProfile {
  name: string
  lastName: string
  avatarUrl: string
  bio: string
  email: string
}

interface TeacherProfile {
  name: string
  lastName: string
  avatarUrl: string
  bio: string
  title: string
  email: string
}

const SettingsPage = () => {
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    name: 'María',
    lastName: 'González',
    avatarUrl: '/student-avatar.png',
    bio: 'Estudiante de desarrollo web apasionada por crear experiencias digitales.',
    email: 'maria.gonzalez@example.com',
  })

  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>({
    name: 'Carlos',
    lastName: 'Rodríguez',
    avatarUrl: '/teacher-avatar.png',
    bio: 'Desarrollador full-stack con más de 10 años de experiencia enseñando tecnologías web modernas.',
    title: 'Desarrollador Senior & Instructor',
    email: 'carlos.rodriguez@example.com',
  })

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Guardando perfil de estudiante:', studentProfile)
    // Aquí iría la lógica para guardar en la base de datos
  }

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Guardando perfil de profesor:', teacherProfile)
    // Aquí iría la lógica para guardar en la base de datos
  }

  const handleAvatarChange = () => {
    // Aquí iría la lógica para subir una nueva imagen
    console.log('Cambiar avatar')
  }

  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="container p-5 mx-auto">
      {CURRENT_ROLE === 'STUDENT' ? (
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">Perfil de Estudiante</CardTitle>
            <CardDescription>
              Actualiza tu información personal como estudiante
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleStudentSubmit} className="space-y-6">
              <div className="flex items-center gap-6 pb-6">
                <div className="relative">
                  <Avatar className="border-primary/10 size-24 border-4">
                    <AvatarImage
                      src={studentProfile.avatarUrl || '/placeholder.svg'}
                      alt={studentProfile.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {getInitials(
                        studentProfile.name,
                        studentProfile.lastName
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={handleAvatarChange}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex-center absolute -right-1 -bottom-1 size-8 rounded-full shadow-md transition-colors"
                    aria-label="Cambiar foto de perfil"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-semibold">
                    {studentProfile.name} {studentProfile.lastName}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {studentProfile.email}
                  </p>
                  <span className="bg-primary/10 text-primary dark:text-foreground mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium">
                    Estudiante
                  </span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="student-name" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input
                    id="student-name"
                    value={studentProfile.name}
                    onChange={(e) =>
                      setStudentProfile({
                        ...studentProfile,
                        name: e.target.value,
                      })
                    }
                    className="border-input"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="student-lastName"
                    className="text-sm font-medium"
                  >
                    Apellido
                  </label>
                  <Input
                    id="student-lastName"
                    value={studentProfile.lastName}
                    onChange={(e) =>
                      setStudentProfile({
                        ...studentProfile,
                        lastName: e.target.value,
                      })
                    }
                    className="border-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="student-email" className="text-sm font-medium">
                  Correo Electrónico
                </label>
                <Input
                  id="student-email"
                  type="email"
                  value={studentProfile.email}
                  disabled
                  className="bg-muted/50 cursor-not-allowed"
                />
                <p className="text-muted-foreground text-xs">
                  El correo electrónico no puede ser modificado
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="student-bio" className="text-sm font-medium">
                  Biografía
                </label>
                <Textarea
                  id="student-bio"
                  value={studentProfile.bio}
                  onChange={(e) =>
                    setStudentProfile({
                      ...studentProfile,
                      bio: e.target.value,
                    })
                  }
                  rows={4}
                  className="border-input resize-none"
                  placeholder="Cuéntanos un poco sobre ti..."
                />
                <p className="text-muted-foreground text-xs">
                  {studentProfile.bio.length}/500 caracteres
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" className="gap-2">
                  <Save className="h-4 w-4" />
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader className="border-border border-b">
            <CardTitle className="text-2xl">Perfil de Profesor</CardTitle>
            <CardDescription>
              Actualiza tu información profesional como instructor
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleTeacherSubmit} className="space-y-6">
              <div className="flex items-center gap-6 pb-6">
                <div className="relative">
                  <Avatar className="border-primary/10 size-24 border-4">
                    <AvatarImage
                      src={teacherProfile.avatarUrl || '/placeholder.svg'}
                      alt={teacherProfile.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {getInitials(
                        teacherProfile.name,
                        teacherProfile.lastName
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={handleAvatarChange}
                    className="bg-primary hover:bg-primary/90 flex-center absolute -right-1 -bottom-1 size-8 rounded-full text-white shadow-md transition-colors"
                    aria-label="Cambiar foto de perfil"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-semibold">
                    {teacherProfile.name} {teacherProfile.lastName}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {teacherProfile.email}
                  </p>
                  <span className="bg-primary/10 text-primary dark:text-foreground mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium">
                    Profesor
                  </span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="teacher-name" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input
                    id="teacher-name"
                    value={teacherProfile.name}
                    onChange={(e) =>
                      setTeacherProfile({
                        ...teacherProfile,
                        name: e.target.value,
                      })
                    }
                    className="border-input"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="teacher-lastName"
                    className="text-sm font-medium"
                  >
                    Apellido
                  </label>
                  <Input
                    id="teacher-lastName"
                    value={teacherProfile.lastName}
                    onChange={(e) =>
                      setTeacherProfile({
                        ...teacherProfile,
                        lastName: e.target.value,
                      })
                    }
                    className="border-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="teacher-email" className="text-sm font-medium">
                  Correo Electrónico
                </label>
                <Input
                  id="teacher-email"
                  type="email"
                  value={teacherProfile.email}
                  disabled
                  className="bg-muted/50 cursor-not-allowed"
                />
                <p className="text-muted-foreground text-xs">
                  El correo electrónico no puede ser modificado
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="teacher-title" className="text-sm font-medium">
                  Título Profesional
                </label>
                <Input
                  id="teacher-title"
                  value={teacherProfile.title}
                  onChange={(e) =>
                    setTeacherProfile({
                      ...teacherProfile,
                      title: e.target.value,
                    })
                  }
                  className="border-input"
                  placeholder="Ej: Desarrollador Senior, PhD en Ciencias de la Computación"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="teacher-bio" className="text-sm font-medium">
                  Biografía Profesional
                </label>
                <Textarea
                  id="teacher-bio"
                  value={teacherProfile.bio}
                  onChange={(e) =>
                    setTeacherProfile({
                      ...teacherProfile,
                      bio: e.target.value,
                    })
                  }
                  rows={5}
                  className="border-input resize-none"
                  placeholder="Describe tu experiencia y áreas de especialización..."
                />
                <p className="text-muted-foreground text-xs">
                  {teacherProfile.bio.length}/1000 caracteres
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" className="gap-2">
                  <Save className="h-4 w-4" />
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
export default SettingsPage
