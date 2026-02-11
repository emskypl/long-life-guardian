using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangeProductToListOfProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Products_ProductId",
                table: "Meals");

            migrationBuilder.DropIndex(
                name: "IX_Meals_ProductId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Meals");

            migrationBuilder.AddColumn<string>(
                name: "MealId",
                table: "Products",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_MealId",
                table: "Products",
                column: "MealId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Meals_MealId",
                table: "Products",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Meals_MealId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_MealId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "MealId",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "ProductId",
                table: "Meals",
                type: "TEXT",
                nullable: true);

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
    }
}
