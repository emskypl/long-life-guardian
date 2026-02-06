using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDietDayWithMealEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Breakfast",
                table: "DietDays");

            migrationBuilder.DropColumn(
                name: "Dinner",
                table: "DietDays");

            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "DietDays");

            migrationBuilder.DropColumn(
                name: "Lunch",
                table: "DietDays");

            migrationBuilder.RenameColumn(
                name: "Snacks",
                table: "DietDays",
                newName: "SnacksId");

            migrationBuilder.AddColumn<string>(
                name: "BreakfastId",
                table: "DietDays",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DinnerId",
                table: "DietDays",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LunchId",
                table: "DietDays",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Meals",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Calories = table.Column<int>(type: "INTEGER", nullable: false),
                    Protein = table.Column<int>(type: "INTEGER", nullable: false),
                    Carbs = table.Column<int>(type: "INTEGER", nullable: false),
                    Fat = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meals", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DietDays_BreakfastId",
                table: "DietDays",
                column: "BreakfastId");

            migrationBuilder.CreateIndex(
                name: "IX_DietDays_DinnerId",
                table: "DietDays",
                column: "DinnerId");

            migrationBuilder.CreateIndex(
                name: "IX_DietDays_LunchId",
                table: "DietDays",
                column: "LunchId");

            migrationBuilder.CreateIndex(
                name: "IX_DietDays_SnacksId",
                table: "DietDays",
                column: "SnacksId");

            migrationBuilder.AddForeignKey(
                name: "FK_DietDays_Meals_BreakfastId",
                table: "DietDays",
                column: "BreakfastId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DietDays_Meals_DinnerId",
                table: "DietDays",
                column: "DinnerId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DietDays_Meals_LunchId",
                table: "DietDays",
                column: "LunchId",
                principalTable: "Meals",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DietDays_Meals_SnacksId",
                table: "DietDays",
                column: "SnacksId",
                principalTable: "Meals",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DietDays_Meals_BreakfastId",
                table: "DietDays");

            migrationBuilder.DropForeignKey(
                name: "FK_DietDays_Meals_DinnerId",
                table: "DietDays");

            migrationBuilder.DropForeignKey(
                name: "FK_DietDays_Meals_LunchId",
                table: "DietDays");

            migrationBuilder.DropForeignKey(
                name: "FK_DietDays_Meals_SnacksId",
                table: "DietDays");

            migrationBuilder.DropTable(
                name: "Meals");

            migrationBuilder.DropIndex(
                name: "IX_DietDays_BreakfastId",
                table: "DietDays");

            migrationBuilder.DropIndex(
                name: "IX_DietDays_DinnerId",
                table: "DietDays");

            migrationBuilder.DropIndex(
                name: "IX_DietDays_LunchId",
                table: "DietDays");

            migrationBuilder.DropIndex(
                name: "IX_DietDays_SnacksId",
                table: "DietDays");

            migrationBuilder.DropColumn(
                name: "BreakfastId",
                table: "DietDays");

            migrationBuilder.DropColumn(
                name: "DinnerId",
                table: "DietDays");

            migrationBuilder.DropColumn(
                name: "LunchId",
                table: "DietDays");

            migrationBuilder.RenameColumn(
                name: "SnacksId",
                table: "DietDays",
                newName: "Snacks");

            migrationBuilder.AddColumn<string>(
                name: "Breakfast",
                table: "DietDays",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Dinner",
                table: "DietDays",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "DietDays",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Lunch",
                table: "DietDays",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
