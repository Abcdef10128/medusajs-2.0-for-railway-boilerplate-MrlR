"use client"

import { resetOnboardingState } from "@lib/data/onboarding"
import { Button, Container, Text } from "@medusajs/ui"

const OnboardingCta = ({ orderId }: { orderId: string }) => {
  return (
    <Container className="max-w-4xl h-full bg-ui-bg-subtle w-full">
      <div className="flex flex-col gap-y-4 center p-4 md:items-center">
        <Text className="text-ui-fg-base text-xl">
          Ваш тестовий заказ було успішно створено! 🎉
        </Text>
        <Text className="text-ui-fg-subtle text-small-regular">
          Тепер ви можете завершити налаштування вашого магазину в адмінпанелі..
        </Text>
        <Button
          className="w-fit"
          size="xlarge"
          onClick={() => resetOnboardingState(orderId)}
        >
          Завершити налаштування в адмінпанелі
        </Button>
      </div>
    </Container>
  )
}

export default OnboardingCta
