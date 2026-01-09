// app/actions/auth.ts
"use server"

import { API_URL } from "@/config/env"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const res = await fetch(API_URL + '/api/v1/auth/sign-in', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      const status = res.status

      if (status === 403) {
        return { error: errorData.message || "Cuenta no verificada o bloqueada" }
      }
      if (status === 401) {
        return { error: "Credenciales inválidas" }
      }
      if (status === 404) {
        return { error: "Usuario no encontrado" }
      }

      return { error: errorData.message || "Error en el servidor" }
    }

    const user = await res.json()

    // Si OK → procedemos con signIn de Auth.js para crear la sesión
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Error inesperado, intenta más tarde" }
  }
}