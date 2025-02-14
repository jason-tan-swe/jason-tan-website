"use client";

import Link from "next/link";
import { ExpandableBlogCard } from "./ExpandableBlogCard";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  readingTime: string;
  variant?: "default" | "minimal" | "gradient" | "neon" | "animated" | "highlight" | "expandable";
  content?: string;
}

export default function BlogCard({
  title = "Title was not set",
  excerpt,
  date,
  slug,
  readingTime,
  variant = "default",
  content = "",
}: BlogCardProps) {
  // Default Variant
  if (variant === "default") {
    return (
      <Link
        href={`/blog/${slug}`}
        className="group block p-6 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg hover:bg-neutral-900/70 transition-all duration-300"
      >
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-neutral-100 group-hover:text-green-400 transition-colors">
            {title}
          </h3>
          <p className="text-neutral-400 line-clamp-2">{excerpt}</p>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>{date}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Minimal Variant
  if (variant === "minimal") {
    return (
      <Link
        href={`/blog/${slug}`}
        className="group block p-6 border-b border-neutral-800 hover:bg-neutral-900/10 transition-colors"
      >
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-neutral-100">{title}</h3>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>{date}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Gradient Variant
  if (variant === "gradient") {
    return (
      <Link
        href={`/blog/${slug}`}
        className="shadow-neon group block p-6 bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm border border-neutral-800 rounded-lg hover:from-neutral-900/70 hover:to-neutral-800/50 transition-all duration-300"
      >
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-neutral-100 group-hover:text-green-400 transition-colors">
            {title}
          </h3>
          <p className="text-neutral-400 line-clamp-2">{excerpt}</p>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>{date}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Neon Variant
  if (variant === "neon") {
    return (
      <Link
        href={`/blog/${slug}`}
        className="group block p-6 bg-neutral-950 border-2 border-transparent hover:border-green-400/20 rounded-lg relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative space-y-3">
          <h3 className="text-xl font-semibold text-green-400">{title}</h3>
          <p className="text-neutral-400 line-clamp-2">{excerpt}</p>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>{date}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Animated Gradient Variant
  if (variant === "animated") {
    return (
      <Link
        href={`/blog/${slug}`}
        className="group block p-6 bg-neutral-950 rounded-lg relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#00ff00_0%,#00ff00_10%,transparent_10%,transparent_100%)] opacity-20 group-hover:opacity-40 animate-[spin_6s_linear_infinite]"></div>
        <div className="relative space-y-3">
          <h3 className="text-xl font-semibold text-green-400">{title}</h3>
          <p className="text-neutral-400 line-clamp-2">{excerpt}</p>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>{date}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Highlight Variant
  if (variant === "highlight") {
    return (
      <Link
        href={`/blog/${slug}`}
        className="group block p-6 bg-neutral-950 rounded-lg relative overflow-hidden hover:bg-neutral-900 transition-colors duration-300"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(74,222,128,0.1)_50%,transparent_75%)] bg-[length:400%_400%] opacity-0 group-hover:opacity-100 animate-[gradient_6s_linear_infinite]"></div>
        <div className="relative space-y-3">
          <h3 className="text-xl font-semibold text-green-400">{title}</h3>
          <p className="text-neutral-400 line-clamp-2">{excerpt}</p>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>{date}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Expandable Variant
  return (
    <ExpandableBlogCard
      content={content}
      title={title}
      excerpt={excerpt}
      date={date}
      slug={slug}
      readingTime={readingTime}
    />
  )
}

// Sample usage examples
export function BlogCardExamples() {
  const samplePost = {
    title: "Building a Modern Blog with Next.js",
    excerpt: "Learn how to create a high-performance blog using Next.js 13 features like Server Components and the App Router.",
    date: "2023-07-15",
    slug: "modern-blog-nextjs",
    readingTime: "5 min read"
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Default</h3>
        <BlogCard {...samplePost} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Minimal</h3>
        <BlogCard {...samplePost} variant="minimal" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Gradient</h3>
        <BlogCard {...samplePost} variant="gradient" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Neon</h3>
        <BlogCard {...samplePost} variant="neon" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Animated</h3>
        <BlogCard {...samplePost} variant="animated" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Expandable</h3>
        <BlogCard
          {...samplePost}
          variant="expandable"
          content={`
## Introduction
Artificial Intelligence (AI) has revolutionized numerous industries, and personal finance is no exception. AI-powered finance apps offer users tools to manage their money more effectively, save time, and make informed decisions.

## 1. Data Extraction and OCR
One of the most transformative features of AI-powered finance apps is Optical Character Recognition (OCR). OCR allows the app to read and digitize information from physical or digital receipts, invoices, and bank statements. This functionality eliminates the need for manual entry, saving users significant time and reducing errors.

**Example:** When a user uploads a photo of a receipt, OCR technology scans the text, extracts relevant details like the vendor, amount, and date, and organizes them into a digital format.

## 2. Categorization
AI excels at identifying patterns in data. By analyzing transaction details, an app can categorize expenses into predefined buckets like groceries, dining, transportation, and entertainment. Some apps allow users to create custom categories for personalized tracking.

**Benefits:**
- Users gain insights into spending habits
- Personalized budgets can be generated automatically
- Trends are easier to visualize with charts and graphs

## 3. Integration with Banking Systems
Many finance apps integrate with banking APIs, such as the Plaid API, to fetch real-time account and transaction data. This allows for:
- Automatic syncing of expenditures and account balances
- Providing a comprehensive overview of financial health in one place

## 4. AI-Driven Financial Advice
Advanced finance apps offer AI-driven recommendations to help users achieve financial goals. By analyzing income, expenses, and financial trends, these tools can suggest personalized budgets, identify opportunities to save, or recommend investment strategies.

## 5. Spending Analysis and Insights
AI enables powerful spending analysis tools that offer visualizations and detailed reports. These include pie charts of expenses, trends over time, and comparisons to previous months. Insights help users understand where they can cut back, save more, or reallocate resources for financial growth.

**Example:** If a user consistently overspends on dining out, the app might alert them and suggest meal planning alternatives to stay within budget.

## 6. Security and Privacy
Ensuring user trust is critical for finance apps. Many use encryption and secure authentication methods, like two-factor authentication (2FA) or biometrics, to protect sensitive financial data. Compliance with data protection regulations (e.g., GDPR, CCPA) is also essential.

## 7. Automation and Notifications
Finance apps often automate repetitive tasks, like bill payments or savings transfers. Notifications can remind users of upcoming due dates, potential overdraft risks, or even spending that deviates from typical patterns.

**Example:** A user may receive an alert when their utility bill is due or when their spending on a credit card exceeds a self-imposed limit.

## 8. Investment Tracking and Management
Some AI-powered apps offer features to track investment portfolios, provide stock recommendations, and even manage investments autonomously. Robo-advisors like Wealthfront or Betterment are popular examples that use AI to handle portfolio diversification, tax-loss harvesting, and rebalancing.

## 9. Personalization
One key advantage of AI in finance apps is the ability to personalize experiences. By learning user preferences and behavior, apps can tailor their functionality to fit individual financial habits and goals.

**Example:** If a user wants to save for a vacation, the app might recommend a dedicated savings account, track progress toward the goal, and provide suggestions for boosting contributions.

## 10. Future Trends in AI Finance Apps
The evolution of AI will continue to reshape personal finance. Potential developments include:
- Deeper integration with blockchain for secure, transparent transactions
- More sophisticated AI models for predicting financial outcomes
- Enhanced real-time assistance via AI-powered chatbots or voice interfaces

## Conclusion
AI-powered finance apps are transforming the way we manage money. By automating tedious tasks, offering insightful analysis, and personalizing recommendations, they empower users to make better financial decisions with less effort. As the technology evolves, these tools will become even more indispensable in achieving financial well-being.`}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Highlight</h3>
        <BlogCard {...samplePost} variant="highlight" />
      </div>
    </div>
  );
}
