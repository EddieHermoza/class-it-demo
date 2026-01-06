'use client'

import React from 'react'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/modules/shared/components/ui/breadcrumb'

export interface BreadcrumbItemType {
  label: string
  href?: string
}

interface AppBreadcrumbProps {
  items: BreadcrumbItemType[]
  className?: string
}

export function AppBreadcrumb({ items, className }: AppBreadcrumbProps) {
  if (items.length === 0) return null

  return (
    <div className={`${className || ''}`}>
      <div className="container mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => {
              const isLast = index === items.length - 1

              return (
                <React.Fragment key={index}>
                  {isLast ? (
                    <BreadcrumbItem>
                      <BreadcrumbPage className="hover:text-primary cursor-default transition-colors duration-300">
                        {item.label}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <>
                      <BreadcrumbItem>
                        {item.href ? (
                          <BreadcrumbLink
                            className="hover:text-primary cursor-pointer transition-colors duration-300"
                            asChild
                          >
                            <Link href={item.href}>{item.label}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage className="cursor-default">
                            {item.label}
                          </BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}
