import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RECIPES = [
  { id: 1, title: "Овсянка с ягодами", calories: 320, tags: ["завтрак", "вегетарианское"], ingredients: ["овсяные хлопья", "ягоды", "миндальное молоко"], benefits: "Улучшает пищеварение, даёт длительное чувство сытости" },
  { id: 2, title: "Салат с киноа и авокадо", calories: 450, tags: ["обед", "веганское"], ingredients: ["киноа", "авокадо", "огурец", "оливковое масло"], benefits: "Богат растительным белком и полезными жирами" },
  { id: 3, title: "Запечённый лосось с овощами", calories: 520, tags: ["ужин", "белок"], ingredients: ["лосось", "брокколи", "морковь"], benefits: "Источник омега-3 и качественного белка" },
  { id: 4, title: "Смузи шпинат-банан", calories: 210, tags: ["перекус", "детокс"], ingredients: ["шпинат", "банан", "яблоко"], benefits: "Поддерживает иммунитет и уровень энергии" },
  { id: 5, title: "Греческий йогурт с орехами и мёдом", calories: 280, tags: ["перекус", "белок"], ingredients: ["греческий йогурт", "грецкие орехи", "мёд"], benefits: "Укрепляет мышцы и улучшает микрофлору кишечника" },
  { id: 6, title: "Омлет с овощами на пару", calories: 300, tags: ["завтрак", "низкоуглеводное"], ingredients: ["яйца", "болгарский перец", "кабачок"], benefits: "Поддерживает обмен веществ и здоровье мышц" },
  { id: 7, title: "Чечевичный суп", calories: 350, tags: ["обед", "вегетарианское"], ingredients: ["чечевица", "лук", "морковь", "специи"], benefits: "Снижает уровень холестерина и насыщает" },
  { id: 8, title: "Запечённые яблоки с корицей", calories: 180, tags: ["десерт", "без сахара"], ingredients: ["яблоки", "корица"], benefits: "Полезный десерт для пищеварения" },
];

export default function HealthyRecipesApp() {
  const [query, setQuery] = useState("");
  const [maxCalories, setMaxCalories] = useState(600);
  const [selected, setSelected] = useState(null);

  const GOALS = {
    mass: { protein: 150, fat: 80, carbs: 300, label: "Набор массы" },
    pp: { protein: 110, fat: 60, carbs: 200, label: "ПП" },
  } as const;

  const [goal, setGoal] = useState<keyof typeof GOALS>("pp");

  const filtered = RECIPES.filter(
    (r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) &&
      r.calories <= maxCalories
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">🥗 Здоровые рецепты</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Поиск рецепта..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Макс. калорий"
          value={maxCalories}
          onChange={(e) => setMaxCalories(Number(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((recipe) => (
          <Card key={recipe.id} className="rounded-2xl shadow-sm">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Калорийность: {recipe.calories} ккал
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button className="w-full" onClick={() => setSelected(recipe)}>
                Посмотреть рецепт
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Цели БЖУ */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">🎯 Цель питания</h2>
        <div className="flex gap-4 mb-4">
          {Object.entries(GOALS).map(([key, g]) => (
            <Button
              key={key}
              variant={goal === key ? "default" : "outline"}
              onClick={() => setGoal(key as keyof typeof GOALS)}
            >
              {g.label}
            </Button>
          ))}
        </div>
        <Card className="max-w-md">
          <CardContent className="p-4">
            <p>
              Белки: <b>{GOALS[goal].protein} г</b>
            </p>
            <p>
              Жиры: <b>{GOALS[goal].fat} г</b>
            </p>
            <p>
              Углеводы: <b>{GOALS[goal].carbs} г</b>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Карточка рецепта */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
              <p className="mb-2">Калории: {selected.calories} ккал</p>
              <p className="mb-2">
                <b>Польза:</b> {selected.benefits}
              </p>
              <div className="mb-4">
                <b>Ингредиенты:</b>
                <ul className="list-disc ml-5">
                  {selected.ingredients.map((i: string) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setSelected(null)}
              >
                Закрыть
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
