export async function sendTelegramNotification(message: string) {
  try {
    const response = await fetch("/api/send-telegram-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      throw new Error("Failed to send Telegram notification")
    }
  } catch (error) {
    console.error("Error sending Telegram notification:", error)
  }
}

export async function sendNewLeadNotification(province: string, city: string) {
  const message = `Nieuwe Lead
Provincie: ${province}
Stad: ${city}`
  await sendTelegramNotification(message)
}

// Remove the startTelegramBot function as it's no longer needed in the client-side code

