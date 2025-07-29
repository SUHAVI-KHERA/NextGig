import { SkillSuggestionForm } from '@/components/skill-suggester/skill-suggestion-form';

export default function SkillSuggesterPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">AI Skill Suggester</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Enhance your profile by discovering new skills. Our AI analyzes your experience to recommend what's in demand.
        </p>
      </div>
      <SkillSuggestionForm />
    </div>
  );
}
