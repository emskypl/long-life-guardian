using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddProductTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Calories",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Carbs",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Fat",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Protein",
                table: "Meals");

            migrationBuilder.RenameColumn(
                name: "CaloriesActual",
                table: "DietDays",
                newName: "ProteinTarget");

            migrationBuilder.AddColumn<string>(
                name: "ProductId",
                table: "Meals",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CarbsTarget",
                table: "DietDays",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FatTarget",
                table: "DietDays",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Products",
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
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Meals_ProductId",
                table: "Meals",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Products_ProductId",
                table: "Meals",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Products_ProductId",
                table: "Meals");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Meals_ProductId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "CarbsTarget",
                table: "DietDays");

            migrationBuilder.DropColumn(
                name: "FatTarget",
                table: "DietDays");

            migrationBuilder.RenameColumn(
                name: "ProteinTarget",
                table: "DietDays",
                newName: "CaloriesActual");

            migrationBuilder.AddColumn<int>(
                name: "Calories",
                table: "Meals",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Carbs",
                table: "Meals",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Fat",
                table: "Meals",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Protein",
                table: "Meals",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
